import crypto from "crypto";
import { PrimitiveValueObject } from "../valueobject";

const seed = "abcdefghijklmnopqrstuvwxyz0123456789";
const length = 32;

export const createEventPath = (): string =>
  Array.from(crypto.randomBytes(length))
    .map((n) => seed[n % seed.length])
    .join("");

export class EventPath extends PrimitiveValueObject<string> {
  static create(): EventPath {
    return new EventPath(createEventPath());
  }
  protected validate(value: string): void {
    if (value.length != 32) {
      throw new Error("path must be 32 characters");
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
