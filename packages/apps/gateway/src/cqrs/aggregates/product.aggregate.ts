import { AggregateRoot } from '@nestjs/cqrs';
import { ProductWasAddedEvent } from '../events/product-was-added.event';
import { ProductWasRemovedEvent } from '../events/product-was-removed.event';
import { ProductWasModifiedEvent } from '../events/product-was-modified.event';

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
}
