import { Logger } from '@nestjs/common';

export class ProductWasAddedEvent {
  public constructor(
    public id: number,
    public name: string,
    public price: number,
    public count: number
  ) {
    Logger.log('[CQRS] ProductAddEvent Called!');
  }
}
