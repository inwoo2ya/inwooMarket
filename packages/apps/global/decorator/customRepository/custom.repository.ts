import { Repository } from 'typeorm';
import { CustomRepository } from './typeorm-ex.decorator';
import { Product } from '../../entity/product.entity';

@CustomRepository(Product)
export class ProductRepository extends Repository<Product> {}
