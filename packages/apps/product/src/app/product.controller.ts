import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'packages/apps/gateway/src/app/app.service';
import { Product } from 'packages/entity/product.entity';
import { AddProduct, ProductById } from 'packages/proto/product';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { Repository } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(
    private readonly AppService: AppService,
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>
  ) {}

  @Get(':id')
  getOneProduct(@Param('id') id: ProductById['id']): Promise<Product> {
    console.log(id);
    return this.ProductRepository.findOne({ where: { id: id } });
  }
}
