import { arrayMax } from "../../util";
import { PrimitiveValueObject } from "../valueobject";

export class GuestNumber extends PrimitiveValueObject<number> {
  static readonly MIN: number = 1;
  static generate(numbers: number[]): GuestNumber {
    const max = arrayMax(numbers);
    return new GuestNumber(max + 1);
  }
  protected validate(value: number): void {
    if (value < GuestNumber.MIN) {
      throw new Error("invalid guest number");
    }
  }
}
