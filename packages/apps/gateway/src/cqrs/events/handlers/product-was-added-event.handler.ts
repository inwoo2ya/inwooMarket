import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductWasAddedEvent } from '../product-was.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductWasAddedEvent)
export class ProductWasAddedEventHandler
  implements IEventHandler<ProductWasAddedEvent>
{
  handle(event: ProductWasAddedEvent) {
    Logger.log('ProductWasAddedEventHandler Called');
    return event;
  }
}
