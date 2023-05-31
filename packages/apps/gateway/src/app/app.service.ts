import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Product } from 'packages/entity/product.entity';
import {
  AddProduct,
  ProductById,
  ProductServiceController,
} from 'packages/proto/product';
import { Observable, Subject } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  private productService: ProductServiceController;
  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
  onModuleInit(): any {
    this.productService =
      this.client.getService<ProductServiceController>('ProductService');
  }
  //findOne 자동연결
  findOne(data: ProductById): Promise<Product> | Observable<Product> | Product {
    return this.productService.findOne({ id: data.id });
  }
}
