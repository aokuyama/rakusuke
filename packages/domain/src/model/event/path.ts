import crypto from "crypto";

const seed = "abcdefghijklmnopqrstuvwxyz0123456789";
const length = 32;

export const createEventPath = (): string =>
  Array.from(crypto.randomBytes(length))
    .map((n) => seed[n % seed.length])
    .join("");

export class EventPath {
  private readonly _value: string;
  static create(): EventPath {
    return new EventPath(createEventPath());
  }
  constructor(value: string) {
    if (value.length != 32) {
      throw new Error("path must be 32 characters");
    }
    this._value = Object.freeze(value);
  }
  get value(): string {
    return this._value;
  }
}
