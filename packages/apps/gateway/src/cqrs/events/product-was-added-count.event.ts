import { Logger } from '@nestjs/common';

export class ProductWasAddedCountEvent {
  public constructor(public id: number, public count: number) {
    Logger.log('[CQRS] ProductCountAddEvent Called!');
  }
}
