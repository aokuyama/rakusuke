import { Date } from "./date";
import { EventName } from "./name";
import { EventPath } from "./path";

export class Event {
  readonly _path: EventPath;
  readonly _name: EventName;
  readonly description: string | undefined;
  readonly schedules: Schedule[];
  constructor(
    path: string,
    name: string,
    schedules: { date: string }[],
    description?: string | undefined
  ) {
    this._path = new EventPath(path);
    this._name = new EventName(name);
    this.schedules = schedules.map((d) => new Schedule(d.date));
    this.description = description;
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
