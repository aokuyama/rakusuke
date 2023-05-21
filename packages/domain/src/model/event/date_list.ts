import { ArrayValueObject } from "../valueobject";
import { Date } from "./date";

export class DateList extends ArrayValueObject<Date, string> {
  protected limit(): number {
    return 20;
  }
  protected validate(value: Date[]): void {
    if (value.length > this.limit()) {
      throw new Error("dates must be 20 num or less");
    }
    if (new Set(value.map((d) => d.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
  isLimit = (): boolean => this.length() == this.limit();
  globalThisDates = (): globalThis.Date[] => this._value.map((d) => d.value);
}

export class EventDates extends DateList {
  static new(args: string[]): EventDates {
    return new EventDates(args.map((d) => new Date(d)));
  }
  protected validate(value: Date[]): void {
    if (value.length == 0) {
      throw new Error("at least one date is required");
    }
    super.validate(value);
  }
  get _dates(): Date[] {
    return this._value;
  }
}
