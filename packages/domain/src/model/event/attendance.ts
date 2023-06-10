import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "../date";

interface AttendanceProps {
  readonly date: Date;
  readonly attend: boolean;
}
export interface AttendanceArgs {
  readonly date: string;
  readonly attend: boolean;
}

export class Attendance extends StructValueObject<
  AttendanceProps,
  AttendanceArgs
> {
  static new(args: AttendanceArgs): Attendance {
    return new Attendance({
      date: new Date(args.date),
      attend: args.attend,
    });
  }
  protected validate(value: AttendanceProps): void {
    // throw new Error("Method not implemented.");
  }
  get _date(): Date {
    return this._value.date;
  }
  get date(): string {
    return this._value.date.toString();
  }
  get attend(): boolean {
    return this._value.attend;
  }
  switch = (attend: boolean): Attendance => {
    if (attend == this.attend) {
      throw new Error("cannot toggle");
    }
    return new Attendance({
      date: this._date,
      attend: attend,
    });
  };
}

abstract class AttendanceList extends ArrayValueObject<
  Attendance,
  AttendanceArgs
> {
  protected validate(value: Attendance[]): void {
    if (new Set(value.map((a) => a._date.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
  existsDate = (date: Date): boolean => {
    for (const a of this._value) {
      if (a._date.isEqual(date)) {
        return true;
      }
    }
    return false;
  };
  isAttend = (date: Date): boolean => {
    for (const a of this._value) {
      if (a._date.isEqual(date)) {
        return a.attend;
      }
    }
    throw new Error("not found date: " + date.toString());
  };
  switchdList = (args: {
    id: string;
    attend: boolean;
  }): Attendance[] | null => {
    const attendance = [];
    let isFound = false;
    for (const a of this._value) {
      if (a._date.idIs(args.id)) {
        if (a.attend == args.attend) {
          return null;
        } else {
          attendance.push(a.switch(args.attend));
          isFound = true;
        }
      } else {
        attendance.push(a);
      }
    }
    if (!isFound) {
      throw new Error(args.id + " is not found");
    }
    return attendance;
  };
}

export class CurrentAttendanceList extends AttendanceList {
  static new(args: AttendanceArgs[]): CurrentAttendanceList {
    return new CurrentAttendanceList(args.map((v) => Attendance.new(v)));
  }
}

export class NewAttendanceList extends AttendanceList {
  static new(args: AttendanceArgs[]): NewAttendanceList {
    return new NewAttendanceList(args.map((v) => Attendance.new(v)));
  }
  static newByDates(args: AttendanceProps[]): NewAttendanceList {
    return new NewAttendanceList(args.map((v) => new Attendance(v)));
  }
  protected validate(value: Attendance[]): void {
    if (value.length == 0) {
      throw new Error("at least one answer is required");
    }
    super.validate(value);
  }
  switch = (args: { id: string; attend: boolean }): NewAttendanceList => {
    const list = this.switchdList(args);
    if (list === null) {
      return this;
    }
    return new NewAttendanceList(list);
  };
  toCurrentAttendanceList = (): CurrentAttendanceList =>
    new CurrentAttendanceList(this._value);
  toCheckList = (): {
    id: string;
    name: string;
    checked: boolean;
  }[] =>
    this._value.map((a) => {
      return { id: a._date.id(), name: a.date, checked: a.attend };
    });
}
