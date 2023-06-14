import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterProductHandler } from '../cqrs/commands/handlers/register-product.handler';
import { RemoveProductHandler } from '../cqrs/commands/handlers/remove-product.handler';
import { ModificationProductHandler } from '../cqrs/commands/handlers/modification-product.handler';
import { ProductCommandHandlers } from '../cqrs/commands/handlers';
import { GetAllProductQueryHandler } from '../cqrs/queries/handlers/get-all-products.handler';
import { GetByIdProductQueryHandler } from '../cqrs/queries/handlers/get-by-id-product.handler';
import { ProductQueryHandlers } from '../cqrs/queries/handlers';
import { ProductEventHandlers } from '../cqrs/events/handlers';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      //proto에 있는 product Package 연결
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: 'packages/libs/shared/src/global/proto/product.proto',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    ...ProductCommandHandlers,
    ...ProductQueryHandlers,
    ...ProductEventHandlers,
  ],
})
export class AppModule {}
