import { PrimitiveValueObject } from "../valueobject";

export class EventName extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length == 0) {
      throw new Error("event must have a name");
    }
    if (value.length > 30) {
      throw new Error("name must be 30 characters or less");
    }
  }
}
