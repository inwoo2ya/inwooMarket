import { AggregateRoot } from '@nestjs/cqrs';
import {
  ProductWasAddedEvent,
  ProductWasRemovedEvent,
  ProductWasModifiedEvent,
  ProductWasAddedCountEvent,
} from '../events/product-was.event';

export class ProductAggregate extends AggregateRoot {
  constructor(private readonly id: number) {
    super();
  }

  public registerProduct(
    id: number,
    name: string,
    price: number,
    count: number
  ) {
    this.apply(new ProductWasAddedEvent(id, name, count, price));
  }
  public removeProduct(id: number) {
    this.apply(new ProductWasRemovedEvent(id));
  }

  public ModificationProduct(
    id: number,
    name: string,
    price: number,
    count: number
  ) {
    this.apply(new ProductWasModifiedEvent(id, name, count, price));
  }
  public AddProductCount(id: number, count: number) {
    this.apply(new ProductWasAddedCountEvent(id, count));
  }
}
