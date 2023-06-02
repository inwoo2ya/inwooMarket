/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ServerCredentials } from '@grpc/grpc-js';
import { ProductModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.GRPC, //grpc 전송기 설정
      options: {
        package: 'product', // 연결할 proto 패키지
        credentials: ServerCredentials.createInsecure(), //서버자격증명
        protoPath:
          // 파일의 절대 경로
          'packages/apps/global/proto/product.proto',
      },
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  await app.listen();
}

bootstrap();
