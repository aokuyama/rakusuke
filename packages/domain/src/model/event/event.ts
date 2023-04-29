import { Date } from "./date";
import { EventName } from "./name";
import { EventPath } from "./path";

interface UpcomingEventArgs {
  path: string;
  name: string;
  schedules: { date: string }[];
  description?: string | undefined;
}

export class UpcomingEvent {
  readonly _path: EventPath;
  readonly _name: EventName;
  readonly description: string | undefined;
  readonly schedules: Schedule[];
  constructor(args: UpcomingEventArgs) {
    this._path = new EventPath(args.path);
    this._name = new EventName(args.name);
    this.schedules = args.schedules.map((d) => new Schedule(d.date));
    this.description = args.description;
  }
  get name(): string {
    return this._name.value;
  }
  get path(): string {
    return this._path.value;
  }
}

class Schedule {
  readonly date: Date;
  constructor(date: string) {
    this.date = new Date(date);
  }
}
