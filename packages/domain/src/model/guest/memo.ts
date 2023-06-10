import { PrimitiveValueObject } from "../valueobject";

export class GuestMemo extends PrimitiveValueObject<string | undefined> {
  static readonly MAX: number = 120;
  protected validate(value: string | undefined): void {
    if (!value) {
      return;
    }
    if (value.length > GuestMemo.MAX) {
      throw new Error("memo must be " + GuestMemo.MAX + " characters or less");
    }
  }
}
