import { parse, format } from "date-fns";

export class Date {
  private readonly date: globalThis.Date;
  constructor(dateStr: string) {
    this.date = parse(dateStr, "yyyy/MM/dd", new globalThis.Date());
    if (isInvalidDate(this.date)) {
      throw new Error("invalid date:" + dateStr);
    }
  }
  toString = (): string => {
    return format(this.date, "yyyy/MM/dd");
  };
}
const isInvalidDate = (date: globalThis.Date) => Number.isNaN(date.getTime());
