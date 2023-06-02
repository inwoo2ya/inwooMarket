import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  Product,
  ProductById,
  ProductServiceClient,
  ProductServiceController,
} from 'packages/apps/global/proto/product';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('/')
export class AppController implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }
  // @Get()
  // getManyProduct(): Observable<Product[]> {
  //   const ids = new ReplaySubject<ProductById>();

  //   ids.next({ id: 1 });
  //   ids.next({ id: 2 });
  //   ids.next({ id: 3 });
  //   ids.complete();

  //   return this.productService.findMany(ids.asObservable()).pipe(toArray());
  // }

  @Get(':id')
  getProductOne(@Param('id') id: number): Observable<Product> {
    console.log(2, id);
    return this.productService.findOne({ id });
  }
}
