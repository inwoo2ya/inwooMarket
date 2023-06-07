import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'packages/apps/global/entity/product.entity';
import { AddProduct, ProductById, ProductServiceClient } from '@shared';
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import { ProductRepository } from 'packages/apps/global/decorator/customRepository/custom.repository';
import { Repository } from 'typeorm';

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
}
