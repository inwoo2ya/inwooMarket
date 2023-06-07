import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterProductCommand } from '../register-product.command';
import { ProductServiceController } from '@shared';

@CommandHandler(RegisterProductCommand)
export class ProductHandler implements ICommandHandler<RegisterProductCommand> {
  constructor(private repository: ProductServiceController) {}

  async execute(command: RegisterProductCommand): Promise<any> {
    const { id, name, price, count } = command;
    // const product = this.
  }
}
