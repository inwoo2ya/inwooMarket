import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { AddCountProductCommand } from '../product.command';
import { ProductServiceClient } from '@shared';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Logger } from '@nestjs/common';
import { ProductAggregate } from '../../aggregates/product.aggregate';

@CommandHandler(AddCountProductCommand)
export class AddCountProductHandler {
  private productService: ProductServiceClient;

  public constructor(
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc,
    private publisher: EventPublisher
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }
  async execute(command: AddCountProductCommand): Promise<any> {
    try {
      const { id, count } = command;
      const product = await this.productService.addProductCount(command);
      console.log(command);
      if (product instanceof Error) {
        throw product;
      }
      const productAggregate = this.publisher.mergeObjectContext(
        new ProductAggregate(command.id)
      );
      productAggregate.AddProductCount(id, count);
      productAggregate.commit();
      return product;
    } catch (e) {
      Logger.error(e, 'AddCountProductHandler.execute Error Handler: ');
      return e;
    }
  }
}
