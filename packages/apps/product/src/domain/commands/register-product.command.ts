import { ICommand } from '@nestjs/cqrs';

export class RegisterProductCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly count: number,
    readonly price: number
  ) {}
}
