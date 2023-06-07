import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';

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
  providers: [AppController],
})
export class AppModule {}
