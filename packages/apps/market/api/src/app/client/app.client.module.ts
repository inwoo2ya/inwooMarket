import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ProductClientController } from './app.client.controller';
import { Product } from '../../../../../global/entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrpcService } from './grpc/grpcMethod.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [GrpcService],
  controllers: [ProductClientController],
})
export class ProductClientModule {}
