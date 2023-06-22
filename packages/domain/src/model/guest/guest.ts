import { PrimitiveValueObject, StructValueObject } from "../valueobject";
import {
  AttendanceArgs,
  CurrentAttendanceList,
  NewAttendanceList,
} from "../event/attendance";
import { Date } from "../date";
import { GuestMemo } from "./memo";
import { GuestNumber } from "./number";

interface GuestProps {
  readonly number: GuestNumber;
  readonly name: GuestName;
  readonly memo: GuestMemo;
  readonly attendance: NewAttendanceList;
}

interface GuestArgs {
  readonly number: number;
  readonly name: string;
  readonly attendance: AttendanceArgs[];
  readonly memo?: string | undefined;
}

export class NewGuest extends StructValueObject<GuestProps, GuestArgs> {
  static new(args: {
    number: GuestNumber;
    name: string;
    attendance: AttendanceArgs[];
    memo?: string | undefined;
  }): NewGuest {
    return new NewGuest({
      number: args.number,
      name: new GuestName(args.name),
      memo: new GuestMemo(args.memo),
      attendance: NewAttendanceList.new(args.attendance),
    });
  }
  get number(): number {
    return this._value.number.value;
  }
  get name(): string {
    return this._value.name.value;
  }
  get _name(): GuestName {
    return this._value.name;
  }
  get memo(): string | undefined {
    return this._memo.value;
  }
  get _memo(): GuestMemo {
    return this._value.memo;
  }
  protected get _attendance(): NewAttendanceList {
    return this._value.attendance;
  }
  isAnswering = (date: Date): boolean => {
    return this._attendance.existsDate(date);
  };
  isAttend = (date: Date): boolean => {
    return this._attendance.isAttend(date);
  };
  getCurrentAttendanceList = (): CurrentAttendanceList =>
    this._attendance.toCurrentAttendanceList();
}

export class GuestName extends PrimitiveValueObject<string> {
  static readonly MIN: number = 1;
  static readonly MAX: number = 20;
  protected validate(value: string): void {
    if (value.length < GuestName.MIN) {
      throw new Error("guest must have a name");
    }
    if (value.length > GuestName.MAX) {
      throw new Error("name must be " + GuestName.MAX + " characters or less");
    }
  }
}
