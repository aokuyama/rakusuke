import { EventGuest, EventGuestArgs, EventGuestList } from "../guest";
import { ArrayValueObject, StructValueObject } from "../valueobject";
import { AttendanceList } from "./attendance";
import { Date } from "./date";
import { EventName } from "./name";
import { EventPath } from "./path";

export interface UpcomingEventArgs {
  path: string;
  name: string;
  schedules: { date: string }[];
  guests: EventGuestArgs[];
  description?: string | undefined;
}

interface UpcomingEventProps {
  readonly path: EventPath;
  readonly name: EventName;
  readonly description: string | undefined;
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
      schedules: new Schedules(args.schedules),
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
  get schedules() {
    return this._value.schedules.value;
  }
  protected get _schedules(): Schedules {
    return this._value.schedules;
  }
  get guests() {
    return this._value.guests.value;
  }
  protected get _guests(): EventGuestList {
    return this._value.guests;
  }
  newAttendance = () => {
    return AttendanceList.create(
      this._value.schedules.dates().map((date) => {
        return { date: date, attend: false };
      })
    );
  };
  dateMap = (): {
    dates: { id: string; date: string }[];
    guests: {
      id: string;
      name: string;
      attendance: { id: string; attend: boolean | undefined }[];
    }[];
  } => {
    const _dates = this._schedules.dates();
    const dates = _dates.map((date) => {
      return { id: date.id(), date: date.toString() };
    });
    return { dates: dates, guests: this._guests.dateMap(_dates) };
  };
  pushGuest = (guest: EventGuest): UpcomingEvent => {
    return new UpcomingEvent({
      name: this._name,
      path: this._path,
      schedules: this._schedules,
      guests: this._guests.push(guest),
      description: this._value.description,
    });
  };
}

interface ScheduleProps {
  readonly date: Date;
}
interface ScheduleArgs {
  readonly date: string;
}

class Schedule extends StructValueObject<ScheduleProps, ScheduleArgs> {
  static new(args: ScheduleArgs): Schedule {
    return new Schedule({
      date: new Date(args.date),
    });
  }
  protected validate(value: ScheduleProps): void {
    // throw new Error("Method not implemented.");
  }
  get date(): string {
    return this._date.toString();
  }
  get _date(): Date {
    return this._value.date;
  }
}

class Schedules extends ArrayValueObject<Schedule, ScheduleArgs> {
  constructor(value: ScheduleArgs[]) {
    super(value.map((v) => Schedule.new(v)));
  }
  protected validate(value: Schedule[]): void {
    // throw new Error("Method not implemented.");
  }
  dates = () =>
    this._value.map((s) => {
      return s._date;
    });
}
