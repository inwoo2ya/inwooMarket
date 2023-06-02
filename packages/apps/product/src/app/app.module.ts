import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'packages/apps/global/entity/product.entity';
import { ProductController } from './product.controller';
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
  ],
  controllers: [ProductController],
  providers: [ProductController],
})
export class ProductModule {}
