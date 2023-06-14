import { EventPublisher, QueryHandler } from '@nestjs/cqrs';
import { GetAllProductQuery } from '../product.query';
import { ProductServiceClient } from '@shared';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@QueryHandler(GetAllProductQuery)
export class GetAllProductQueryHandler {
  private productService: ProductServiceClient;
  public constructor(
    @Inject('PRODUCT_PACKAGE')
    private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  public async execute(query: GetAllProductQuery): Promise<any> {
    console.log('Find ALL~~!');
    const product = await this.productService.findAll(query);
    return product;
  }
}
