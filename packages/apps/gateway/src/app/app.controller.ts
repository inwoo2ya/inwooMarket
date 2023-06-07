import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import {
  Product,
  ProductById,
  ProductServiceClient,
  ProductServiceController,
} from '@shared';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { RegisterProductCommand } from 'packages/apps/product/src/domain/commands/register-product.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller('/')
export class AppController implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc,
    private commandBus: CommandBus
  ) {}
  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }
  @Get()
  getManyProduct(): Observable<Product[]> {
    const ids = new ReplaySubject<ProductById>();

    ids.next({ id: 1 });
    ids.next({ id: 2 });
    ids.next({ id: 3 });
    ids.complete();

    return this.productService.findMany(ids.asObservable()).pipe(toArray());
  }

  @Get(':id')
  getProductOne(@Param('id') id: number): Observable<Product> {
    console.log(2, id);
    return this.productService.findOne({ id });
  }

  @Post()
  async createProduct(@Body() dto: Product): Promise<void> {
    const { id, name, count, price } = {
      id: 4,
      name: '딸기',
      count: 5,
      price: 4000,
    };

    const command = new RegisterProductCommand(id, name, count, price);

    return this.commandBus.execute(command);
  }
}
