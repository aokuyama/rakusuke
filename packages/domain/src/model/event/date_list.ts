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
}

export class EventDateListPickUp extends DateList {
  constructor(args: Date[]) {
    args.sort((a, b) => a.unixtime() - b.unixtime());
    super(args);
  }

  globalThisDates = (): globalThis.Date[] => this._value.map((d) => d.value);

  toggleByDate = (date: Date | globalThis.Date): EventDateListPickUp => {
    const dates = [];
    if (date instanceof globalThis.Date) {
      date = new Date(date);
    }
    for (const d of this._value) {
      if (d.isEqual(date)) {
        continue;
      }
      dates.push(d);
    }
    if (dates.length == this.length()) {
      dates.push(date);
      if (dates.length > this.limit()) {
        return this;
      }
    }
    return new EventDateListPickUp(dates);
  };
}
