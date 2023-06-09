export class ProductEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly count: number,
    public readonly price: number
  ) {}
}
export class ProductEventSuccess {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly count: number
  ) {}
}

export class ProductEventFail {
  constructor(public readonly id: number, public readonly error: object) {}
}
