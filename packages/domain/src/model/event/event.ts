import { Date } from "./date";
import { createEventPath } from "./path";

export class NewEvent {
  readonly path: string;
  readonly name: string;
  readonly description?: string;
  readonly dates: Date[];
  constructor(name: string, dates: string[], description?: string | undefined) {
    this.path = createEventPath();
    if (name.length == 0) {
      throw new Error("event must have a name");
    }
    this.name = name;
    this.description = description;
    if (dates.length == 0) {
      throw new Error("at least one date is required");
    }
    this.dates = dates.map((d) => new Date(d));
  }
}

export class Schedule {
  readonly date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}
