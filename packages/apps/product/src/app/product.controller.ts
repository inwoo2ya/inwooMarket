import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'packages/apps/global/entity/product.entity';
import {
  AddCount,
  AddProduct,
  DeleteProduct,
  Product,
  ProductById,
  ProductEmpty,
  ProductServiceClient,
} from '@shared';
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'packages/apps/global/dto/createProduct.dto';

export class ProductController {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  @GrpcMethod('ProductService') //findOne 자동연결
  findOne(data: ProductById): Promise<Product> {
    console.log(data);
    // const items = [
    //   { id: 1, name: 'aa', count: 1, price: 100 },
    //   { id: 2, name: 'bb', count: 1, price: 100 },
    // ];
    // return items.find(({ id }) => id === data.id)

    const result = this.productRepository.findOne({
      where: {
        id: data.id,
      },
    });
    return result;
  }
  @GrpcMethod('ProductService')
  async findMany(data: ProductEmpty): Promise<Product[]> {
    console.log('findMany');
    return await this.productRepository.find();
  }

  @GrpcMethod('ProductService')
  async createProduct(data: CreateProductDto): Promise<Product | Error> {
    try {
      const product = this.productRepository.create(data);
      return await this.productRepository.save(product);
    } catch (e) {
      return new Error(e);
    }
  }
  @GrpcMethod('ProductService')
  async removeProduct(data: ProductById): Promise<DeleteProduct | Error> {
    try {
      const product = this.productRepository.findOne({
        where: { id: data.id },
      });
      await this.productRepository.delete(data.id);

      return product;
    } catch (e) {
      return new Error(e);
    }
  }
  @GrpcMethod('ProductService')
  async addProductCount(data: AddCount): Promise<Product | Error> {
    try {
      const { id, count } = data;
      console.log(data);
      await this.productRepository.update({ id }, { count });
      return this.productRepository.findOne({ where: { id } });
    } catch (e) {
      return new Error(e);
    }
  }
  @GrpcMethod('ProductService')
  async updateProduct(data: Product): Promise<Product | Error> {
    try {
      const { id, count, name, price } = data;
      console.log(data);
      await this.productRepository.update({ id }, { name, count, price });
      return this.productRepository.findOne({ where: { id } });
    } catch (e) {
      return new Error(e);
    }
  }
}
