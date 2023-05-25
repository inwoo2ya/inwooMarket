import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ProductClientController } from './app.client.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(
            'C:/Users/LAVARWAVE/Desktop/nx-workspace/nx-workspace/packages/apps/market/api/src/proto/product.proto'
          ),
        },
      },
    ]),
  ],

  controllers: [ProductClientController],
})
export class ProductClientModule {}
