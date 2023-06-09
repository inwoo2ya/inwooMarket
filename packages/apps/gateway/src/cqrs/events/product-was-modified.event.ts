import { Logger } from '@nestjs/common';

export class ProductWasModifiedEvent {
  public constructor(
    public id: number,
    public name: string,
    public count: number,
    public price: number
  ) {
    Logger.log('[CQRS] ProductModifiedEvent Called!');
  }
}
