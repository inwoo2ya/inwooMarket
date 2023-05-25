import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductClientModule } from './client/app.client.module';
import { ProductClientController } from './client/app.client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './client/entities/product.entity';

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
    ProductClientModule,
  ],
})
export class AppModule {}
