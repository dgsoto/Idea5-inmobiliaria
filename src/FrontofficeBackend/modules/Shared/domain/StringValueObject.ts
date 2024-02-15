export abstract class StringValueObject extends String {
  private _value: string;

  constructor(value: string) {
    super(value);
    this._value = value;
  }

  public getValue(): string {
    return this._value;
  }

  protected setValue(value: string): void {
    this._value = value;
  }

  public toString(): string {
    return this._value;
  }
}
