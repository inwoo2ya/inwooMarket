import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterProductCommand } from '../product.command';
import { ProductServiceClient, ProductServiceController } from '@shared';
import { ProductEntity } from 'packages/apps/global/entity/product.entity';
import { ProductAggregate } from '../../aggregates/product.aggregate';
import { Inject, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@CommandHandler(RegisterProductCommand)
export class RegisterProductHandler
  implements ICommandHandler<RegisterProductCommand>
{
  private productService: ProductServiceClient;
  constructor(
    @Inject('PRODUCT_PACKAGE')
    private client: ClientGrpc,
    //서비스로 변경해야할듯 grpc를 호출, Inject문제
    private publisher: EventPublisher
  ) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  async execute(command: RegisterProductCommand): Promise<any> {
    try {
      const { id, name, price, count } = command;
      const productEntity = new ProductEntity();
      productEntity.id = id;
      productEntity.name = name;
      productEntity.count = count;
      productEntity.price = price;

      const product = await this.productService.createProduct(productEntity);

      if (product instanceof Error) {
        throw product;
      }
      const productAggregate = this.publisher.mergeObjectContext(
        await new ProductAggregate(id)
      );
      productAggregate.registerProduct(id, name, count, price);
      productAggregate.commit();

      return product;
    } catch (e) {
      Logger.error(e, '[CQRS] RegisterProductHandler.execute Error Handler: ');
      return e;
    }
  }
}
