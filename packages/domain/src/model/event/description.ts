import { PrimitiveValueObject } from "../valueobject";

export class EventDescription extends PrimitiveValueObject<string | undefined> {
  static readonly MAX: number = 300;
  protected validate(value: string | undefined): void {
    if (!value) {
      return;
    }
    if (value.length > EventDescription.MAX) {
      throw new Error(
        "description must be " + EventDescription.MAX + " characters or less"
      );
    }
  }
}
