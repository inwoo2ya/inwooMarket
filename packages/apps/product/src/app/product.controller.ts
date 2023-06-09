import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'packages/apps/global/entity/product.entity';
import {
  AddProduct,
  DeleteProduct,
  ProductById,
  ProductCount,
  ProductServiceClient,
} from '@shared';
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../../global/dto/createProduct.dto';
import { ModificationProductDto } from '../../../global/dto/modification-product.dto';

export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  @GrpcMethod('ProductService') //findOne 자동연결
  findOne(data: ProductById): Promise<Product> {
    console.log(3, data);
    // const items = [
    //   { id: 1, name: 'aa', count: 1, price: 100 },
    //   { id: 2, name: 'bb', count: 1, price: 100 },
    // ];
    // return items.find(({ id }) => id === data.id)

    const result = this.productRepository.findOne({
      where: {
        id: data.id,
      },
    });
    return result;
  }
  @GrpcStreamMethod('ProductService')
  findMany(data: Observable<ProductById>): Observable<Product> {
    console.log(5, data);
    const product$ = new Subject<Product>();
    const onNext = async (productById: ProductById) => {
      const item = await this.productRepository.findOne({
        where: {
          id: productById.id,
        },
      });
      product$.next(item);
    };
    const onComplete = () => product$.complete();
    data.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return product$.asObservable();
  }
  @GrpcMethod('ProductService')
  async createProduct(data: CreateProductDto): Promise<Product | Error> {
    try {
      const product = this.productRepository.create(data);
      return await this.productRepository.save(product);
    } catch (e) {
      return new Error(e);
    }
  }
  @GrpcMethod('ProductService')
  async removeProduct(data: ProductById): Promise<DeleteProduct | Error> {
    try {
      const product = this.productRepository.findOne({
        where: { id: data.id },
      });
      await this.productRepository.delete(data.id);

      return product;
    } catch (e) {
      return new Error(e);
    }
  }
  @GrpcMethod('ProductService')
  async updateProduct(data: Product): Promise<Product | Error> {
    try {
      console.log(data);
      await this.productRepository.update(data.id, data);
      return this.productRepository.findOne({ where: { id: data.id } });
    } catch (e) {
      return new Error(e);
    }
  }
}
