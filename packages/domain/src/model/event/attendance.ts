import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "./date";

interface AttendanceProps {
  readonly date: Date;
  readonly attend: boolean;
}
interface AttendanceArgs {
  readonly date: Date;
  readonly attend: boolean;
}

export class Attendance extends StructValueObject<
  AttendanceProps,
  AttendanceArgs
> {
  static new(args: AttendanceArgs): Attendance {
    return new Attendance({
      date: args.date,
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

export class AttendanceList extends ArrayValueObject<
  Attendance,
  AttendanceProps
> {
  static new(args: AttendanceArgs[]) {
    return new AttendanceList(args.map((v) => Attendance.new(v)));
  }
  protected validate(value: Attendance[]): void {
    if (value.length == 0) {
      throw new Error("at least one date is required");
    }
    if (new Set(value.map((a) => a._date.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
  list = () =>
    this._value.map((s) => {
      return { id: s._date.id(), name: s.date, checked: s.attend };
    });
  switch = (args: { id: string; attend: boolean }): AttendanceList => {
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
      return new AttendanceList(ats);
    }
    throw new Error(args.id + " is not found");
  };
}
