import { PrimitiveValueObject, StructValueObject } from "../valueobject";
import { AttendanceArgs, AttendanceList } from "../event/attendance";
import { EventPath } from "../event/path";
import { Date } from "../event/date";

interface GuestProps {
  readonly name: GuestName;
  readonly attendance: AttendanceList;
}

interface GuestArgs {
  readonly name: string;
  readonly attendance: AttendanceArgs[];
}

export class NewGuest extends StructValueObject<GuestProps, GuestArgs> {
  static new(args: GuestArgs): NewGuest {
    return new NewGuest({
      name: new GuestName(args.name),
      attendance: AttendanceList.new(args.attendance),
    });
  }
  protected validate(value: GuestProps): void {
    // throw new Error("Method not implemented.");
  }
  get name(): string {
    return this._value.name.value;
  }
  get _attendance(): AttendanceList {
    return this._value.attendance;
  }
  isAnswering = (date: Date): boolean => {
    return this._attendance.exists(date);
  };
  isAttend = (date: Date): boolean => {
    return this._attendance.isAttend(date);
  };
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
