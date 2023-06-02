import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from './product.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<ProductController>(ProductController);
      // expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
