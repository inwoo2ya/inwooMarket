import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { IProduct, ProductById } from '../../interface/ProductInterface';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';

interface ProductService {
  findOne(data: ProductById): Observable<any>;
  createProduct(data: {
    id: number;
    name: string;
    count: number;
    price: number;
  });
  findMany(upstream: Observable<ProductById>): Observable<Product>;
}

@Controller('product')
export class ProductClientController implements OnModuleInit {
  private productService: ProductService;
  //ProductClientService = new ProductClientService 느낌?
  constructor(
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>
  ) {}

  onModuleInit(): any {
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  @Get()
  async getMany(): Promise<Observable<Product[]>> {
    const ids$ = new ReplaySubject<ProductById>();

    for (let i = 1; i <= (await this.ProductRepository.count()); i++) {
      ids$.next({ id: i });
    }

    ids$.complete();

    const stream = this.productService.findMany(ids$.asObservable());

    return stream.pipe(toArray());
  }
  @Get(':id')
  getOneProduct(@Param('id') id: number): Observable<Product> {
    console.log(id);
    return this.productService.findOne({ id: +id });
  }
  @Post('create/:id')
  createTest(
    @Param('id') id: number,
    @Body() data: CreateProductDto
  ): Observable<Product> {
    console.log(id);
    return this.productService.createProduct({
      id,
      name: '키위',
      count: 1,
      price: 3000,
    });
  }
  @GrpcMethod('ProductService') //findOne 자동연결
  findOne(data: ProductById): Promise<Product> {
    // return this.ProductRepository.findOne(({ id }) => id === data.id);
    return this.ProductRepository.findOne({
      where: {
        id: data.id,
      },
    });
  }
  // @GrpcMethod('ProductService')
  // createProduct(data: Product): Product {
  //   return this.items.push(data);
  // }
  @GrpcStreamMethod('ProductService')
  findMany(data$: Observable<ProductById>): Observable<Product> {
    const product$ = new Subject<Product>();
    const onNext = (productById: ProductById) => {
      const item = this.ProductRepository.find({
        where: {
          id: productById.id,
        },
      });
      console.log(item);
      product$.next(item as unknown as Product);
    };
    const onComplete = () => product$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });
    return product$.asObservable();
  }
}
