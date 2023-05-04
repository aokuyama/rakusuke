import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "./date";

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

export class CurrentAttendanceList extends ArrayValueObject<
  Attendance,
  AttendanceArgs
> {
  static new(args: AttendanceArgs[]): CurrentAttendanceList {
    return new CurrentAttendanceList(args.map((v) => Attendance.new(v)));
  }
  static newByDates(args: AttendanceProps[]): CurrentAttendanceList {
    return new CurrentAttendanceList(args.map((v) => new Attendance(v)));
  }
  protected validate(value: Attendance[]): void {
    if (new Set(value.map((a) => a._date.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
  switch = (args: { id: string; attend: boolean }): CurrentAttendanceList => {
    const ats = [];
    let isFound = false;
    for (const a of this._value) {
      if (a._date.idIs(args.id)) {
        if (a.attend == args.attend) {
          return this;
        } else {
          ats.push(a.switch(args.attend));
          isFound = true;
        }
      } else {
        ats.push(a);
      }
    }
    if (isFound) {
      return new CurrentAttendanceList(ats);
    }
    throw new Error(args.id + " is not found");
  };
  exists = (date: Date): boolean => {
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
}

export class NewAttendanceList extends ArrayValueObject<
  Attendance,
  AttendanceArgs
> {
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
    if (new Set(value.map((a) => a._date.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
  switch = (args: { id: string; attend: boolean }): NewAttendanceList => {
    const ats = [];
    let isFound = false;
    for (const a of this._value) {
      if (a._date.idIs(args.id)) {
        if (a.attend == args.attend) {
          return this;
        } else {
          ats.push(a.switch(args.attend));
          isFound = true;
        }
      } else {
        ats.push(a);
      }
    }
    if (isFound) {
      return new NewAttendanceList(ats);
    }
    throw new Error(args.id + " is not found");
  };
  exists = (date: Date): boolean => {
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
  toCurrentAttendanceList = (): CurrentAttendanceList =>
    new CurrentAttendanceList(this._value);
}
