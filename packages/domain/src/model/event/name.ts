export class EventName {
  private readonly _value: string;
  constructor(value: string) {
    if (value.length == 0) {
      throw new Error("event must have a name");
    }
    if (value.length > 30) {
      throw new Error("name must be 30 characters or less");
    }
    this._value = Object.freeze(value);
  }
  get value(): string {
    return this._value;
  }
}
