import { PrimitiveValueObject } from "../valueobject";

export class EventName extends PrimitiveValueObject<string> {
  static readonly MIN: number = 1;
  static readonly MAX: number = 30;
  protected validate(value: string): void {
    if (value.length < EventName.MIN) {
      throw new Error("event must have a name");
    }
    if (value.length > EventName.MAX) {
      throw new Error("name must be " + EventName.MAX + " characters or less");
    }
  }
}
