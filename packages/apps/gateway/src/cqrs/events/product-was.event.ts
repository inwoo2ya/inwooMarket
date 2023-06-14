import { Logger } from '@nestjs/common';

export class ProductWasRemovedEvent {
  public constructor(public id: number) {
    Logger.log(`${id}-Product 삭제`);
  }
}
export class ProductWasModifiedEvent {
  public constructor(
    public id: number,
    public name: string,
    public count: number,
    public price: number
  ) {
    const data = { name, count, price };
    const modified = [];
    Array('name', 'count', 'price').forEach((element) => {
      if (data[element] !== undefined) modified.push(element);
    });

    Logger.log(`${id}-${name} Product ${modified} 수정`);
  }
}
export class ProductWasAddedEvent {
  public constructor(
    public id: number,
    public name: string,
    public price: number,
    public count: number
  ) {
    Logger.log(`id:${id}, name:${name}, price:${price}, count:${count} 추가`);
  }
}
export class ProductWasAddedCountEvent {
  public constructor(public id: number, public count: number) {
    Logger.log(`${id}-Product 수량 ${count}로 변경`);
  }
}
