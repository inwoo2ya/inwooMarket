import { ProductWasAddedEventHandler } from './product-was-added-event.handler';
import { ProductWasAddedCountEventHandler } from './product-was-addedCount-event.handler';
import { ProductWasModifiedEventHandler } from './product-was-modified-event.handler';
import { ProductWasRemovedEventHandler } from './product-was-removed-event.handler';

export const ProductEventHandlers = [
  ProductWasAddedEventHandler,
  ProductWasRemovedEventHandler,
  ProductWasModifiedEventHandler,
  ProductWasAddedCountEventHandler,
];
