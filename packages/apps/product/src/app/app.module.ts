import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductRepository } from 'packages/apps/global/decorator/customRepository/custom.repository';
import { Product } from 'packages/apps/global/entity/product.entity';
import { TypeOrmExModule } from 'packages/apps/global/decorator/customRepository/typeOrmEx.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '211.110.140.37',
      port: 49164,
      username: 'inwoo',
      password: 'n37w0rk',
      database: 'inwoomarket',
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    // TypeOrmExModule.forCustomRepository([ProductRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductController],
})
export class ProductModule {}
