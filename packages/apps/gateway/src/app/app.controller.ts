import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { Product } from 'packages/proto/product';

@Controller()
export class AppController {
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.findOne(id);
  }
}
