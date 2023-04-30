import { parse, format, isSameDay } from "date-fns";
import { AbstractValueObject } from "../valueobject";

export class Date extends AbstractValueObject<globalThis.Date> {
  protected validate(value: globalThis.Date): void {
    if (isInvalidDate(value)) {
      throw new Error("invalid date:" + value);
    }
  }
  constructor(value: string | globalThis.Date) {
    if (value instanceof globalThis.Date) {
      value = format(value, "yyyy/MM/dd");
    }
    super(parse(value, "yyyy/MM/dd", new globalThis.Date()));
  }
  get value(): globalThis.Date {
    return this._value;
  }

  getGlobalThisDate = (): globalThis.Date => this.value;
  toString = (): string => {
    return format(this.value, "yyyy/MM/dd");
  };
  isEqual = (date: Date): boolean => isSameDay(this.value, date.value);
  unixtime = (): number => this.value.getTime();
  serialize(): string {
    return this.toString();
  }
}

const isInvalidDate = (date: globalThis.Date) => Number.isNaN(date.getTime());
