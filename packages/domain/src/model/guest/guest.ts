import { PrimitiveValueObject, StructValueObject } from "../valueobject";
import {
  AttendanceArgs,
  CurrentAttendanceList,
  NewAttendanceList,
} from "../event/attendance";
import { Date } from "../event/date";
import { GuestMemo } from "./memo";

interface GuestProps {
  readonly name: GuestName;
  readonly memo: GuestMemo;
  readonly attendance: NewAttendanceList;
}

interface GuestArgs {
  readonly name: string;
  readonly attendance: AttendanceArgs[];
  readonly memo?: string | undefined;
}

export class NewGuest extends StructValueObject<GuestProps, GuestArgs> {
  static new(args: GuestArgs): NewGuest {
    return new NewGuest({
      name: new GuestName(args.name),
      memo: new GuestMemo(args.memo),
      attendance: NewAttendanceList.new(args.attendance),
    });
  }
  protected validate(value: GuestProps): void {
    // throw new Error("Method not implemented.");
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
