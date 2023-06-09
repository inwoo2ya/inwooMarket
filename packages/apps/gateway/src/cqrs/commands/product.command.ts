export class RegisterProductCommand {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly count: number,
    public readonly price: number
  ) {}
}
export class RemoveProductCommand {
  public constructor(
    public readonly id: number,
    public readonly name?: string
  ) {}
}
export class ModificationProductCommand {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly count: number
  ) {}
}
