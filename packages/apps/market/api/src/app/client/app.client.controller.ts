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
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { ProductById } from '../../interface/ProductInterface';
import { Product } from '../../../../../global/entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../../../../product/src/app/dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcService } from './grpc/grpcMethod.service';

@Controller('product')
export class ProductClientController {
  //ProductClientService = new ProductClientService 느낌?
  constructor(
    private readonly GrpcService: GrpcService,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>
  ) {}

  @Get()
  async getMany(): Promise<Observable<Product[]>> {
    const ids$ = new ReplaySubject<ProductById>();

    for (let i = 1; i <= (await this.ProductRepository.count()); i++) {
      ids$.next({ id: i });
    }

    ids$.complete();

    const stream = this.GrpcService.findMany(ids$.asObservable());

    return stream.pipe(toArray());
  }
  @Get(':id')
  getOneProduct(@Param('id') id: number): Promise<Product> {
    console.log(id);
    return this.GrpcService.findOne({ id: +id });
  }
  @Post('create')
  createTest(@Body() data: CreateProductDto): Observable<Product> {
    return this.GrpcService.createProduct(data);
  }
}
