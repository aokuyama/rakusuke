import { ArrayValueObject, StructValueObject } from "../valueobject";
import { AttendanceArgs, AttendanceList } from "../event/attendance";
import { GuestNumber } from "./number";
import { GuestName } from "./guest";
import { Date } from "../event/date";

interface EventGuestProps {
  readonly number: GuestNumber;
  readonly name: GuestName;
  readonly attendance: AttendanceList;
}

export interface EventGuestArgs {
  readonly number: number;
  readonly name: string;
  readonly attendance: AttendanceArgs[];
}

export class EventGuest extends StructValueObject<
  EventGuestProps,
  EventGuestArgs
> {
  static new(args: EventGuestArgs): EventGuest {
    return new EventGuest({
      number: new GuestNumber(args.number),
      name: new GuestName(args.name),
      attendance: AttendanceList.new(args.attendance),
    });
  }
  protected validate(value: EventGuestProps): void {
    // throw new Error("Method not implemented.");
  }
  get number(): number {
    return this._value.number.value;
  }
  get name(): string {
    return this._value.name.value;
  }
  protected get _attendance(): AttendanceList {
    return this._value.attendance;
  }
  dateMap = (dates: Date[]): EventGuestDateMap => {
    const attendance = dates.map((date) => {
      return { id: date.id(), attend: this.isAttendOrUndefined(date) };
    });
    return {
      id: this.number.toString(),
      name: this.name,
      attendance: attendance,
    };
  };
  isAttendOrUndefined = (date: Date): boolean | undefined =>
    this._attendance.exists(date) ? this._attendance.isAttend(date) : undefined;
}

export interface EventGuestDateMap {
  id: string;
  name: string;
  attendance: { id: string; attend: boolean | undefined }[];
}

export class EventGuestList extends ArrayValueObject<
  EventGuest,
  EventGuestArgs
> {
  static new(args: EventGuestArgs[]) {
    return new EventGuestList(args.map((v) => EventGuest.new(v)));
  }
  protected validate(value: EventGuest[]): void {
    //
  }
  dateMap = (dates: Date[]): EventGuestDateMap[] =>
    this._value.map((g) => g.dateMap(dates));
}
