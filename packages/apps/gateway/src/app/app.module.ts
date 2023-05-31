import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
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
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: 'packages/proto/product.proto',
        },
      },
    ]),
  ],
  providers: [],
})
export class AppModule {}
