// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { ClientGrpc } from '@nestjs/microservices';
// import { Observable, Subject } from 'rxjs';
// import { Product, ProductById } from '../../interface/ProductInterface';

// interface ProductService {
//   findOne(data: { id: number }): Observable<any>;
//   createProduct(data: {
//     id: number;
//     name: string;
//     count: number;
//     price: number;
//   });
//   findMany(): Observable<ProductById>;
// }
// @Injectable()
// export class ProductClientService implements OnModuleInit {
//   private productService: ProductService;

//   constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
//   onModuleInit(): any {
//     this.productService =
//       this.client.getService<ProductService>('ProductService');
//   }

//   getProduct(id: number): Observable<any> {
//     return this.productService.findOne({ id });
//   }

//   createProduct(
//     id: number,
//     name: string,
//     count: number,
//     price: number
//   ): Observable<any> {
//     return this.productService.createProduct({ id, name, count, price });
//   }

//   getProducts(data$: Observable<ProductById>): Observable<Product> {
//     const product$ = new Subject<Product>();

//     const onNext = (productById: ProductById) => {};
//     const onComplete = () => product$.complete();
//     data$.subscribe({
//       next: onNext,
//       complete: onComplete,
//     });
//     return product$.asObservable();
//   }
// }
