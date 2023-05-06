import { PrimitiveValueObject } from "../valueobject";
import { createToken, makeHash } from "../../service/token";

const length = 32;

abstract class UserTokenBase extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length != length) {
      throw new Error("token must be " + length + " characters");
    }
  }
  hashed(): string {
    if (!process.env.PEPPER) {
      throw new Error("undefined pepper");
    }
    return makeHash(this.value, process.env.PEPPER);
  }
}

export class UserToken extends UserTokenBase {
  rawValue = (): string => this.value;
}

export class NewUserToken extends UserTokenBase {
  static create(): NewUserToken {
    return new NewUserToken(createToken(length));
  }
  toExisting = (): UserToken => new UserToken(this._value);
}
