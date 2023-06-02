/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ServerCredentials } from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC, //grpc 전송기 설정
    options: {
      package: 'product', // 연결할 proto 패키지
      credentials: ServerCredentials.createInsecure(), //서버자격증명
      protoPath:
        // 파일의 절대 경로
        'packages/apps/global/proto/product.proto',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // const globalPrefix = 'api';
}
bootstrap();
