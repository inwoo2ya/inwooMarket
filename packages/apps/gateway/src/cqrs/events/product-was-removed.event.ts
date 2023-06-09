import { Logger } from '@nestjs/common';

export class ProductWasRemovedEvent {
  public constructor(public id: number) {
    Logger.log('[CQRS] ProductRemoveEvent Called!');
  }
}
