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
    if (name.length > 30) {
      throw new Error("name must be 30 characters or less");
    }
    this.name = name;
    this.description = description;
    if (dates.length == 0) {
      throw new Error("at least one date is required");
    }
    if (dates.length > 20) {
      throw new Error("dates must be 20 num or less");
    }
    this.dates = dates.map((d) => new Date(d));
    if (
      new Set(this.dates.map((d) => d.toString())).size != this.dates.length
    ) {
      throw new Error("duplicate date");
    }
  }
}

export class Schedule {
  readonly date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}
