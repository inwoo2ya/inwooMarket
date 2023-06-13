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
  ProductServiceClient,
  ProductServiceController,
} from '@shared';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AddCountProductCommand,
  ModificationProductCommand,
  RegisterProductCommand,
  RemoveProductCommand,
} from '../cqrs/commands/product.command';
import { CreateProductDto } from 'packages/apps/global/dto/createProduct.dto';
import { ModificationProductDto } from 'packages/apps/global/dto/modification-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetAllProductQuery,
  GetByIdProductQuery,
} from '../cqrs/queries/product.query';

@Controller('/')
export class AppController implements OnModuleInit {
  private productService: ProductServiceClient;

  public constructor(
    @Inject('PRODUCT_PACKAGE') private client: ClientGrpc,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}
  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }
  @Get()
  async getManyProduct(): Promise<Product[]> {
    console.log('findAll');
    return await this.queryBus.execute(new GetAllProductQuery());
  }

  @Get(':id')
  async getProductOne(@Param('id') id: number): Promise<ProductById> {
    console.log(2, id);
    const query = new GetByIdProductQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post('/create')
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    const { id, name, count, price } = data;
    console.log(data);
    // return new Error();

    const command = new RegisterProductCommand(id, name, count, price);
    return await this.commandBus.execute(command);
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteProduct> {
    const command = new RemoveProductCommand(id);
    return await this.commandBus.execute(command);
  }
  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() data: ModificationProductDto
  ): Promise<Product> {
    const { name, count, price } = data;
    const command = new ModificationProductCommand(id, name, count, price);

    return await this.commandBus.execute(command);
  }
  @Put('/count/:id')
  async countUpdate(@Param('id') id: number, @Body() data): Promise<Product> {
    const command = new AddCountProductCommand(id, data.count);
    console.log(command);

    return await this.commandBus.execute(command);
  }
}
