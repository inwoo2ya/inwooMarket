import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  DeleteProduct,
  Product,
  ProductById,
  ProductCount,
  ProductServiceClient,
  ProductServiceController,
} from '@shared';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ModificationProductCommand,
  RegisterProductCommand,
  RemoveProductCommand,
} from '../cqrs/commands/product.command';
import { CreateProductDto } from 'packages/apps/global/dto/createProduct.dto';
import { ModificationProductDto } from 'packages/apps/global/dto/modification-product.dto';
import { CommandBus } from '@nestjs/cqrs';

@Controller('/')
export class AppController implements OnModuleInit {
  private productService: ProductServiceClient;

  public constructor(
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

  @Post('/create')
  async createProduct(
    @Body() data: CreateProductDto
  ): Promise<Product | Error> {
    const { id, name, count, price } = data;
    console.log(data);
    // return new Error();

    const command = new RegisterProductCommand(id, name, count, price);
    return await this.commandBus.execute(command);

    return new Error();
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteProduct> {
    console.log('delete', id);
    const command = new RemoveProductCommand(id);
    return await this.commandBus.execute(command);
  }
  @Put('/count/:id')
  async countUpdate(
    @Param('id') id: number,
    @Body() data: ModificationProductDto
  ): Promise<Product> {
    const { name, price, count } = data;

    const command = new ModificationProductCommand(+id, name, count, price);
    console.log(command);

    return await this.commandBus.execute(command);
  }
}
