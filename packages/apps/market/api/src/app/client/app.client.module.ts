import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ProductClientController } from './app.client.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrpcService } from './grpc/grpcMethod.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath:
            'C:/Users/LAVARWAVE/Desktop/nx-workspace/nx-workspace/packages/apps/market/api/src/proto/product.proto',
        },
      },
    ]),
  ],
  providers: [GrpcService],
  controllers: [ProductClientController],
})
export class ProductClientModule {}
