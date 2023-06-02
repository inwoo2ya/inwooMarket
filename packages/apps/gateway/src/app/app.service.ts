import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import {
  AddProduct,
  Product,
  ProductById,
  ProductServiceClient,
  ProductServiceController,
} from 'packages/apps/global/proto/product';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }
  //findOne 자동연결
  findOne(id: number): Observable<Product> {
    console.log(3, id);
    return this.productService.findOne({ id });
  }
}
