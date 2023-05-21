import { parse, format, isSameDay, parseISO, addDays, isAfter } from "date-fns";
import { AbstractValueObject } from "../valueobject";
import ja from "date-fns/locale/ja";

const referenceDate = new globalThis.Date();

export class Date extends AbstractValueObject<globalThis.Date> {
  protected validate(value: globalThis.Date): void {
    if (isInvalidDate(value)) {
      throw new Error("invalid date:" + value);
    }
  }
  constructor(value: string) {
    const d = parse(value, "yyyy/MM/dd", referenceDate);
    super(parseISO(format(d, "yyyy-MM-dd") + "T00:00:00+00:00"));
  }
  static convert(value: globalThis.Date): Date {
    return new Date(Date.formatString(value));
  }
  static formatString(value: globalThis.Date): string {
    return format(value, "yyyy/MM/dd");
  }
  static todayString(): string {
    return Date.today().toString();
  }
  static today(): Date {
    return Date.convert(new globalThis.Date());
  }
  get value(): globalThis.Date {
    return this._value;
  }

  getGlobalThisDate = (): globalThis.Date => this.value;
  toString = (): string => format(this.value, "yyyy/MM/dd");
  isEqual = (date: Date): boolean => isSameDay(this.value, date.value);
  unixtime = (): number => this.value.getTime();
  serialize(): string {
    return this.toString();
  }
  id = (): string => format(this.value, "yyyyMMdd");
  idIs = (id: string): boolean => id === this.id();
  // TODO 良くない比較の仕方。DateのValueオブジェクト型を見直す
  equals = (value: AbstractValueObject<globalThis.Date>): boolean =>
    this.serialize() === value.serialize();
  short = (): string => format(this.value, "M/d(E)", { locale: ja });
  md = (): string => format(this.value, "M/d", { locale: ja });
  addDays = (amount: number): Date => Date.convert(addDays(this.value, amount));
  isAfter = (date: Date): boolean => isAfter(date.value, this.value);
}

const isInvalidDate = (date: globalThis.Date) => Number.isNaN(date.getTime());
