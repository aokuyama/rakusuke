import { parse, format, isSameDay } from "date-fns";

export class Date {
  private readonly date: globalThis.Date;
  constructor(date: string | globalThis.Date) {
    if (date instanceof globalThis.Date) {
      date = format(date, "yyyy/MM/dd");
    }
    this.date = Object.freeze(parse(date, "yyyy/MM/dd", new globalThis.Date()));
    if (isInvalidDate(this.date)) {
      throw new Error("invalid date:" + date);
    }
  }
  getGlobalThisDate = (): globalThis.Date => this.date;
  toString = (): string => {
    return format(this.date, "yyyy/MM/dd");
  };
  isEqual = (date: Date): boolean => isSameDay(this.date, date.date);
  unixtime = (): number => this.date.getTime();
}

const isInvalidDate = (date: globalThis.Date) => Number.isNaN(date.getTime());
