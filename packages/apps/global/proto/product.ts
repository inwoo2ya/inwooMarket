/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'product';

export interface ProductById {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  count: number;
  price: number;
}

export interface AddProduct {
  namse: string;
  price: number;
}

export interface ProductCount {
  name: string;
  count: number;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  createProduct(request: Product): Observable<Product>;

  findOne(request: ProductById): Observable<Product>;

  productManagement(request: ProductCount): Observable<ProductCount>;

  findMany(request: Observable<ProductById>): Observable<Product>;
}

export interface ProductServiceController {
  createProduct(
    request: Product
  ): Promise<Product> | Observable<Product> | Product;

  findOne(
    request: ProductById
  ): Promise<Product> | Observable<Product> | Product;

  productManagement(
    request: ProductCount
  ): Promise<ProductCount> | Observable<ProductCount> | ProductCount;

  findMany(request: Observable<ProductById>): Observable<Product>;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createProduct',
      'findOne',
      'productManagement',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = ['findMany'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';
