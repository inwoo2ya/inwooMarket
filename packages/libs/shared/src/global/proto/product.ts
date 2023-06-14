/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface ProductById {
  id: number;
}

export interface ProductEmpty {
}

export interface Product {
  id: number;
  name: string;
  count: number;
  price: number;
}

export interface Products {
  products: Product[];
}

export interface AddProduct {
  id: number;
  name: string;
  price: number;
}

export interface AddCount {
  id: number;
  count: number;
}

export interface DeleteProduct {
  id: number;
  name: string;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  createProduct(request: Product): Observable<Product>;

  findOne(request: ProductById): Observable<Product>;

  addProductCount(request: AddCount): Observable<Product>;

  findAll(request: ProductEmpty): Observable<Product>;

  updateProduct(request: Product): Observable<Product>;

  removeProduct(request: ProductById): Observable<DeleteProduct>;
}

export interface ProductServiceController {
  createProduct(request: Product): Promise<Product> | Observable<Product> | Product;

  findOne(request: ProductById): Promise<Product> | Observable<Product> | Product;

  addProductCount(request: AddCount): Promise<Product> | Observable<Product> | Product;

  findAll(request: ProductEmpty): Promise<Product> | Observable<Product> | Product;

  updateProduct(request: Product): Promise<Product> | Observable<Product> | Product;

  removeProduct(request: ProductById): Promise<DeleteProduct> | Observable<DeleteProduct> | DeleteProduct;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createProduct",
      "findOne",
      "addProductCount",
      "findAll",
      "updateProduct",
      "removeProduct",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
