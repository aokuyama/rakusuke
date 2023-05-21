import { ArrayValueObject } from "../valueobject";
import { Date } from "./date";

export class DateList extends ArrayValueObject<Date, string> {
  static readonly MAX: number = 20;
  protected limit(): number {
    return DateList.MAX;
  }
  protected validate(value: Date[]): void {
    if (value.length > this.limit()) {
      throw new Error("dates must be " + this.limit() + " num or less");
    }
    if (new Set(value.map((d) => d.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
  isLimit = (): boolean => this.length() == this.limit();
  globalThisDates = (): globalThis.Date[] => this._value.map((d) => d.value);
}

export class EventDates extends DateList {
  static readonly MIN: number = 1;
  static new(args: string[]): EventDates {
    return new EventDates(args.map((d) => new Date(d)));
  }
  protected validate(value: Date[]): void {
    if (value.length < EventDates.MIN) {
      throw new Error("at least one date is required");
    }
    super.validate(value);
  }
  get _dates(): Date[] {
    return this._value;
  }
}
