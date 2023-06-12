import { ArrayValueObject, StructValueObject } from "../valueobject";
import { AttendanceArgs, CurrentAttendanceList } from "../event/attendance";
import { GuestNumber } from "./number";
import { GuestName } from "./guest";
import { Date } from "../date";
import { notNull } from "../../util";
import { GuestDefault } from "./default";
import { GuestMemo } from "./memo";

export interface EventGuestDateMap {
  id: string;
  name: string;
  memo: string | undefined;
  attendance: { id: string; date: Date; attend: boolean | undefined }[];
}

interface EventGuestProps {
  readonly number: GuestNumber;
  readonly name: GuestName;
  readonly memo: GuestMemo;
  readonly attendance: CurrentAttendanceList;
}

export interface EventGuestArgs {
  readonly number: number;
  readonly name: string;
  readonly attendance: AttendanceArgs[];
  readonly memo?: string | undefined;
}

export class EventGuest extends StructValueObject<
  EventGuestProps,
  EventGuestArgs
> {
  static new(args: EventGuestArgs): EventGuest {
    return new EventGuest({
      number: new GuestNumber(args.number),
      name: new GuestName(args.name),
      memo: new GuestMemo(args.memo),
      attendance: CurrentAttendanceList.new(args.attendance),
    });
  }
  protected validate(value: EventGuestProps): void {
    // throw new Error("Method not implemented.");
  }
  get number(): number {
    return this._value.number.value;
  }
  protected get _number(): GuestNumber {
    return this._value.number;
  }
  sameIdAs = (guest: EventGuest): boolean => this.numberIs(guest._number);
  numberIs = (number: GuestNumber): boolean => this._number.equals(number);
  get name(): string {
    return this._value.name.value;
  }
  private get _name(): GuestName {
    return this._value.name;
  }
  get memo(): string | undefined {
    return this._value.memo.value;
  }
  protected get _attendance(): CurrentAttendanceList {
    return this._value.attendance;
  }
  getNumber = (): GuestNumber => this._number;
  getAttendance = (): CurrentAttendanceList => this._attendance;
  dateMap = (dates: Date[]): EventGuestDateMap => {
    const attendance = dates.map((date) => {
      return {
        id: date.id(),
        date: date,
        attend: this.isAttendOrUndefined(date),
      };
    });
    return {
      id: this.number.toString(),
      name: this.name,
      memo: this.memo,
      attendance: attendance,
    };
  };
  isAttendOrUndefined = (date: Date): boolean | undefined =>
    this._attendance.existsDate(date)
      ? this._attendance.isAttend(date)
      : undefined;
  isAnswering = (date: Date): boolean => {
    return this._attendance.existsDate(date);
  };
  isAttend = (date: Date): boolean => {
    return this._attendance.isAttend(date);
  };
  toDefault = (): GuestDefault => new GuestDefault({ name: this._name });
  isDirty = (args: { name: string; memo: string | undefined }): boolean => {
    return !this.isClean(args);
  };
  isClean = (args: { name: string; memo: string | undefined }): boolean => {
    return this.name === args.name && this.memo === args.memo;
  };
}

export class EventGuestList extends ArrayValueObject<
  EventGuest,
  EventGuestArgs
> {
  static new(args: EventGuestArgs[]) {
    return new EventGuestList(args.map((v) => EventGuest.new(v)));
  }
  protected validate(value: EventGuest[]): void {
    if (new Set(value.map((g) => g.number)).size != value.length) {
      throw new Error("duplicate number");
    }
  }
  getByNumber(number: number): EventGuest {
    const n = new GuestNumber(number);
    for (const guest of this._value) {
      if (guest.numberIs(n)) {
        return guest;
      }
    }
    throw new Error("guest not found. number: " + number);
  }
  dateMap = (dates: Date[]): EventGuestDateMap[] =>
    this._value.map((g) => g.dateMap(dates));

  push = (guest: EventGuest): EventGuestList => {
    const newList = [];
    for (const g of this._value) {
      newList.push(g);
    }
    newList.push(guest);
    return new EventGuestList(newList);
  };
  replace = (guest: EventGuest): EventGuestList => {
    const newList = [];
    let isReplace = false;
    for (const g of this._value) {
      if (g.sameIdAs(guest)) {
        newList.push(guest);
        isReplace = true;
      } else {
        newList.push(g);
      }
    }
    if (!isReplace) {
      throw new Error("guest not found. number: " + guest.number);
    }
    return new EventGuestList(newList);
  };
  attendeesByDate = (date: Date): EventGuest[] =>
    this._value
      .map((guest) => (guest.isAttendOrUndefined(date) ? guest : null))
      .filter(notNull);
}
