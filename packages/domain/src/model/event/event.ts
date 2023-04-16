import { Date } from "./date";

export class NewEvent {
  readonly path: string;
  readonly name: string;
  readonly description?: string;
  readonly dates: Date[];
  constructor(
    path: string,
    name: string,
    dates: string[],
    description?: string | undefined
  ) {
    this.path = path;
    this.name = name;
    this.description = description;
    this.dates = dates.map((d) => new Date(d));
  }
}

export class Schedule {
  readonly date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}
