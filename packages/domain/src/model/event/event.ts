import { ArrayValueObject, StructValueObject } from "../valueobject";
import { AttendanceList } from "./attendance";
import { Date } from "./date";
import { EventName } from "./name";
import { EventPath } from "./path";

export interface UpcomingEventArgs {
  path: string;
  name: string;
  schedules: { date: string | globalThis.Date }[];
  description?: string | undefined;
}

interface UpcomingEventProps {
  readonly path: EventPath;
  readonly name: EventName;
  readonly description: string | undefined;
  readonly schedules: Schedules;
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
      description: args.description,
    });
  }
  get name(): string {
    return this._value.name.value;
  }
  get path(): string {
    return this._value.path.value;
  }
  get schedules() {
    return this._value.schedules.value;
  }
  dateItems = () => this._value.schedules.dateItems();
  newAttendance = () => {
    return AttendanceList.create(
      this._value.schedules.dates().map((date) => {
        return { date: date, attend: false };
      })
    );
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

class Schedules extends ArrayValueObject<Schedule, ScheduleProps> {
  constructor(value: any[]) {
    super(value.map((v) => Schedule.new(v)));
  }
  protected validate(value: Schedule[]): void {
    // throw new Error("Method not implemented.");
  }
  dateItems = () =>
    this._value.map((s) => {
      return { id: s.date, name: s.date };
    });
  dates = () =>
    this._value.map((s) => {
      return s._date;
    });
}
