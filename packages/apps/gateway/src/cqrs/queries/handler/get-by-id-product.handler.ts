import { QueryHandler } from '@nestjs/cqrs';
import { GetByIdProductQuery } from '../product.query';
import { ProductServiceClient } from '@shared';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@QueryHandler(GetByIdProductQuery)
export class GetByIdProductQueryHandler {
  private productService: ProductServiceClient;

  public constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  public async execute(query: GetByIdProductQuery): Promise<any> {
    try {
      const product = this.productService.findOne(query);
      if (product instanceof Error) {
        throw product;
      }
      return product;
    } catch (e) {
      return new Error(e);
    }
  }
}
