// import {
//   ClientGrpc,
//   GrpcMethod,
//   GrpcStreamMethod,
// } from '@nestjs/microservices';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateProductDto } from '../../../../../../product/src/app/dto/createProduct.dto';
// import { Observable, Subject } from 'rxjs';
// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { ProductClientController } from '../app.client.controller';
// import { Product } from 'packages/apps/global/entity/product.entity';
// import { ProductById } from '../../../interface/ProductInterface';

// @Injectable()
// export class GrpcService implements OnModuleInit {
//   private productController: ProductClientController;
//   constructor(
//     @Inject('PRODUCT_PACKAGE') private client: ClientGrpc,
//     @InjectRepository(Product)
//     private readonly ProductRepository: Repository<Product>
//   ) {}
//   onModuleInit(): any {
//     this.productController =
//       this.client.getService<ProductClientController>('ProductService');
//   }
//   @GrpcMethod('ProductService') //findOne 자동연결
//   findOne(data: ProductById): Promise<Product> {
//     // return this.ProductRepository.findOne(({ id }) => id === data.id);
//     return this.ProductRepository.findOne({
//       where: {
//         id: data.id,
//       },
//     });
//   }
//   // @GrpcMethod('ProductService')
//   // createProduct(data: CreateProductDto): Observable<Product> {
//   //   // return this.ProductRepository.create(data);
//   //   return;
//   // }
//   // @GrpcStreamMethod('ProductService')
//   // findMany(data$: Observable<ProductById>): Observable<Product> {
//   //   const product$ = new Subject<Product>();
//   //   const onNext = async (data$: ProductById) => {
//   //     const item = await this.ProductRepository.findOne({
//   //       where: {
//   //         id: data$.id,
//   //       },
//   //     });
//   //     console.log(item);
//   //     product$.next(item);
//   //   };
//   //   const onComplete = () => product$.complete();
//   //   data$.subscribe({
//   //     next: onNext,
//   //     complete: onComplete,
//   //   });
//   //   return product$.asObservable();
//   // }
// }
