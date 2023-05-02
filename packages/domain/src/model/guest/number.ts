import { PrimitiveValueObject } from "../valueobject";

export class GuestNumber extends PrimitiveValueObject<number> {
  static generate(numbers: number[]): GuestNumber {
    const max = numbers.length ? Math.max.apply(null, numbers) : 0;
    return new GuestNumber(max + 1);
  }
  protected validate(value: number): void {
    if (value <= 0) {
      throw new Error("invalid guest number");
    }
  }
}
