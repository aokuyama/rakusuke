import crypto from "crypto";
import { PrimitiveValueObject } from "../valueobject";

const seed = "abcdefghijklmnopqrstuvwxyz0123456789";
const length = 32;

export const createUserToken = (): string =>
  Array.from(crypto.randomBytes(length))
    .map((n) => seed[n % seed.length])
    .join("");

export class UserToken extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length != 32) {
      throw new Error("token must be 32 characters");
    }
  }
  hashed(): string {
    if (!process.env.PEPPER) {
      throw new Error("undefined pepper");
    }
    const sha256 = crypto.createHash("sha256");
    sha256.update(this.value + process.env.PEPPER);
    return sha256.digest("hex");
  }
  rawValue = (): string => this.value;
}

export class NewUserToken extends PrimitiveValueObject<string> {
  static create(): NewUserToken {
    return new NewUserToken(createUserToken());
  }
  protected validate(value: string): void {
    if (value.length != 32) {
      throw new Error("token must be 32 characters");
    }
  }
  hashed(): string {
    if (!process.env.PEPPER) {
      throw new Error("undefined pepper");
    }
    const sha256 = crypto.createHash("sha256");
    sha256.update(this.value + process.env.PEPPER);
    return sha256.digest("hex");
  }
}
