import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ModificationProductCommand } from '../product.command';
import { ProductServiceClient } from '@shared';
import { Inject, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Product } from 'packages/apps/global/entity/product.entity';
import { Observable } from 'rxjs';
import { ProductAggregate } from '../../aggregates/product.aggregate';

@CommandHandler(ModificationProductCommand)
export class ModificationProductHandler {
  private productService: ProductServiceClient;

  public constructor(
    @Inject('PRODUCT_PACKAGE')
    private readonly client: ClientGrpc,
    private publisher: EventPublisher
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }
  async execute(command: ModificationProductCommand): Promise<any> {
    try {
      const { id, count, name, price } = command;
      const productEntity = new Product();
      productEntity.id = id;
      productEntity.name = name;
      productEntity.count = count;
      productEntity.price = price;
      console.log(productEntity);
      const product = this.productService.updateProduct(productEntity);

      if (product instanceof Error) {
        throw product;
      }
      const productAggregate = this.publisher.mergeObjectContext(
        await new ProductAggregate(id)
      );
      productAggregate.ModificationProduct(id, name, count, price);
      productAggregate.commit();

      return product;
    } catch (e) {
      Logger.error(e, '[CQRS] UpdateProductHandler.execute Error Handler:');
      return e;
    }
  }
}
