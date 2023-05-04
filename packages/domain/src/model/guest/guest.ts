import { PrimitiveValueObject, StructValueObject } from "../valueobject";
import {
  AttendanceArgs,
  CurrentAttendanceList,
  NewAttendanceList,
} from "../event/attendance";
import { Date } from "../event/date";

interface GuestProps {
  readonly name: GuestName;
  readonly attendance: NewAttendanceList;
}

interface GuestArgs {
  readonly name: string;
  readonly attendance: AttendanceArgs[];
}

export class NewGuest extends StructValueObject<GuestProps, GuestArgs> {
  static new(args: GuestArgs): NewGuest {
    return new NewGuest({
      name: new GuestName(args.name),
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
  protected validate(value: string): void {
    if (value.length == 0) {
      throw new Error("guest must have a name");
    }
    if (value.length > 30) {
      throw new Error("name must be 30 characters or less");
    }
  }
}
