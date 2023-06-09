import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveProductCommand } from '../product.command';
import { ProductServiceClient } from '@shared';
import { Inject, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Product } from 'packages/apps/global/entity/product.entity';
import { ProductAggregate } from '../../aggregates/product.aggregate';

@CommandHandler(RemoveProductCommand)
//
export class RemoveProductHandler {
  private productService: ProductServiceClient;
  public constructor(
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc,
    private publisher: EventPublisher
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  async execute(command: RemoveProductCommand): Promise<any> {
    try {
      const product = this.productService.removeProduct(command);
      if (product instanceof Error) {
        throw product;
      }
      const productAggregate = this.publisher.mergeObjectContext(
        await new ProductAggregate(command.id)
      );
      productAggregate.removeProduct(command.id);
      productAggregate.commit();

      return product;
    } catch (e) {
      Logger.error(e, '[CQRS] RemoveProductHandler.execute Error Handler:');
      return e;
    }
  }
}
