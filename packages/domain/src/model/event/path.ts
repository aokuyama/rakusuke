import { PrimitiveValueObject } from "../valueobject";
import { createToken, makeHash } from "../../service/token";

abstract class EventPathBase extends PrimitiveValueObject<string> {
  static readonly LENGTH: number = 16;
  protected validate(value: string): void {
    if (!EventPathBase.isValidLength(value)) {
      throw new Error("path must be " + EventPathBase.LENGTH + " characters");
    }
  }
  static isValidLength(value: string): boolean {
    return value.length == EventPathBase.LENGTH;
  }

  hashed(): string {
    if (!process.env.PEPPER_EVENT) {
      throw new Error("undefined pepper");
    }
    return makeHash(this.value, process.env.PEPPER_EVENT);
  }
}

export class EventPath extends EventPathBase {
  static newSafe(value: string): EventPath | null {
    if (!EventPathBase.isValidLength(value)) {
      return null;
    }
    return new EventPath(value);
  }
  rawValue = (): string => this.value;
}

export class NewEventPath extends EventPathBase {
  static create(): NewEventPath {
    return new NewEventPath(createToken(EventPathBase.LENGTH));
  }
  toExisting = (): EventPath => new EventPath(this._value);
}
