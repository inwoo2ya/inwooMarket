import { Repository } from 'typeorm';
import { CustomRepository } from './typeorm-ex.decorator';
import { ProductEntity } from '../../entity/product.entity';

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
