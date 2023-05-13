import { PrimitiveValueObject } from "../valueobject";
import { createToken, makeHash } from "../../service/token";

const length = 32;

abstract class EventPathBase extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length != length) {
      throw new Error("path must be " + length + " characters");
    }
  }
  hashed(): string {
    if (!process.env.PEPPER_EVENT) {
      throw new Error("undefined pepper");
    }
    return makeHash(this.value, process.env.PEPPER_EVENT);
  }
}

export class EventPath extends EventPathBase {
  rawValue = (): string => this.value;
}

export class NewEventPath extends EventPathBase {
  static create(): NewEventPath {
    return new NewEventPath(createToken(length));
  }
  toExisting = (): EventPath => new EventPath(this._value);
}
