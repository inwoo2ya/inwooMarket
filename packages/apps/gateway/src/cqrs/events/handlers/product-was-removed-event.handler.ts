import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductWasRemovedEvent } from '../product-was.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductWasRemovedEvent)
export class ProductWasRemovedEventHandler
  implements IEventHandler<ProductWasRemovedEvent>
{
  handle(event: ProductWasRemovedEvent) {
    Logger.log('ProductWasRemovedEventHandler Called');
    return event;
  }
}
