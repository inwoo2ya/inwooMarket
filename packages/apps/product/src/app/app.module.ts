import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'packages/entity/product.entity';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
