import { EventGuest, EventGuestArgs, EventGuestList } from "../guest";
import { StructValueObject } from "../valueobject";
import { CurrentAttendanceList, NewAttendanceList } from "./attendance";
import { EventName } from "./name";
import { EventPath } from "./path";
import { Schedules } from "./schedule";
import { Date } from "./date";

export interface UpcomingEventArgs {
  path: string;
  name: string;
  readonly isOrganizer: boolean;
  schedules: { date: string }[];
  guests: EventGuestArgs[];
  description?: string | undefined;
}

interface UpcomingEventProps {
  readonly path: EventPath;
  readonly name: EventName;
  readonly description: string | undefined;
  readonly isOrganizer: boolean;
  readonly schedules: Schedules;
  readonly guests: EventGuestList;
}

export class UpcomingEvent extends StructValueObject<
  UpcomingEventProps,
  UpcomingEventArgs
> {
  protected validate(value: UpcomingEventProps): void {
    // throw new Error("Method not implemented.");
  }
  static new(args: UpcomingEventArgs): UpcomingEvent {
    return new UpcomingEvent({
      name: new EventName(args.name),
      path: new EventPath(args.path),
      isOrganizer: args.isOrganizer,
      schedules: Schedules.new(args.schedules),
      guests: EventGuestList.new(args.guests),
      description: args.description,
    });
  }
  get name(): string {
    return this._value.name.value;
  }
  protected get _name(): EventName {
    return this._value.name;
  }
  get path(): string {
    return this._value.path.value;
  }
  protected get _path(): EventPath {
    return this._value.path;
  }
  get isOrganizer(): boolean {
    return this._value.isOrganizer;
  }
  protected get _isOrganizer(): boolean {
    return this._value.isOrganizer;
  }
  get _schedules(): Schedules {
    return this._value.schedules;
  }
  get guests() {
    return this._value.guests.value;
  }
  protected get _guests(): EventGuestList {
    return this._value.guests;
  }
  newAttendance = () =>
    NewAttendanceList.newByDates(
      this._value.schedules.dates().map((date) => {
        return { date: date, attend: false };
      })
    );
  newAttendanceByGuest = (guest: EventGuest) =>
    this.newAttendanceByCurrentAttendance(guest.getAttendance());

  newAttendanceByCurrentAttendance = (
    attendance: NewAttendanceList | CurrentAttendanceList
  ) => {
    return NewAttendanceList.newByDates(
      this._value.schedules.dates().map((date) => {
        const checked =
          attendance.existsDate(date) && attendance.isAttend(date);
        return { date: date, attend: checked };
      })
    );
  };
  dateMap = (): {
    dates: { id: string; date: Date; attendees: { name: string }[] }[];
    guests: {
      id: string;
      name: string;
      attendance: { id: string; date: Date; attend: boolean | undefined }[];
    }[];
  } => {
    const _dates = this._schedules.dates();
    const dates = _dates.map((date) => {
      return {
        id: date.id(),
        date: date,
        attendees: this._guests.attendeesByDate(date),
      };
    });
    return { dates: dates, guests: this._guests.dateMap(_dates) };
  };
  pushGuest = (guest: EventGuest): UpcomingEvent => {
    return new UpcomingEvent({
      name: this._name,
      path: this._path,
      isOrganizer: this._isOrganizer,
      schedules: this._schedules,
      guests: this._guests.push(guest),
      description: this._value.description,
    });
  };
  replaceGuest = (guest: EventGuest): UpcomingEvent => {
    return new UpcomingEvent({
      name: this._name,
      path: this._path,
      isOrganizer: this._isOrganizer,
      schedules: this._schedules,
      guests: this._guests.replace(guest),
      description: this._value.description,
    });
  };
  getGuestByNumber = (number: number): EventGuest =>
    this._guests.getByNumber(number);
}
