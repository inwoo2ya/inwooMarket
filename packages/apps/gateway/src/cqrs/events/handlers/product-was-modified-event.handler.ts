import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductWasModifiedEvent } from '../product-was.event';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductWasModifiedEvent)
export class ProductWasModifiedEventHandler
  implements IEventHandler<ProductWasModifiedEvent>
{
  handle(event: ProductWasModifiedEvent) {
    Logger.log('ProductWasModifiedEventHandler Called');
    return event;
  }
}
