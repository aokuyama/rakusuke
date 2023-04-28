import { Date } from "./date";

export class Event {
  readonly path: string;
  readonly name: string;
  readonly description: string | undefined;
  readonly schedules: Schedule[];
  constructor(
    path: string,
    name: string,
    schedules: { date: string }[],
    description?: string | undefined
  ) {
    this.path = path;
    this.name = name;
    this.schedules = schedules.map((d) => new Schedule(d.date));
    this.description = description;
  }
}

export class Schedule {
  readonly date: Date;
  constructor(date: string) {
    this.date = new Date(date);
  }
}
