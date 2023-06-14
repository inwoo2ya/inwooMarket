import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductWasAddedCountEvent } from '../product-was.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductWasAddedCountEvent)
export class ProductWasAddedCountEventHandler
  implements IEventHandler<ProductWasAddedCountEvent>
{
  handle(event: ProductWasAddedCountEvent) {
    Logger.log('ProductWasAddedCountEventHandler Called');
    return event;
  }
}
