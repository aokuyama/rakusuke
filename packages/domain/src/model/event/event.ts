import { ArrayValueObject, StructValueObject } from "../valueobject";
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
  get name(): EventName {
    return this._value.name;
  }
  get path(): EventPath {
    return this._value.path;
  }
  get schedules(): Schedules {
    return this._value.schedules;
  }
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
    return this.date.toString();
  }
}

class Schedules extends ArrayValueObject<Schedule, ScheduleProps> {
  constructor(value: any[]) {
    super(value.map((v) => Schedule.new(v)));
  }
  protected validate(value: Schedule[]): void {
    // throw new Error("Method not implemented.");
  }
}
