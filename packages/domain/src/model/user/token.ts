import { PrimitiveValueObject } from "../valueobject";
import { createToken, makeHash } from "../../service/token";

abstract class UserTokenBase extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length != UserToken.LENGTH) {
      throw new Error("token must be " + UserToken.LENGTH + " characters");
    }
  }
  hashed(): string {
    if (!process.env.PEPPER_USER) {
      throw new Error("undefined pepper");
    }
    return makeHash(this.value, process.env.PEPPER_USER);
  }
}

export class UserToken extends UserTokenBase {
  static readonly LENGTH: number = 32;
  rawValue = (): string => this.value;
}

export class NewUserToken extends UserTokenBase {
  static create(): NewUserToken {
    return new NewUserToken(createToken(UserToken.LENGTH));
  }
  toExisting = (): UserToken => new UserToken(this._value);
}
