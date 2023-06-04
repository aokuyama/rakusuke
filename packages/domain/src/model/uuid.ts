import { v4, validate } from "uuid";
import { PrimitiveValueObject } from "./valueobject";

abstract class UUIDBase extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (!validate(value)) {
      console.error(value);
      throw new Error("invalid uuid");
    }
  }
}

export class UUID extends UUIDBase {}

export class NewUUID extends UUIDBase {
  static create(): NewUUID {
    return new NewUUID(v4());
  }
  toExisting = (): UUID => new UUID(this._value);
}
