import { Date } from "./date";

export class Event {
  private readonly id: string;
  private readonly name: string;
  private readonly description?: string;
  private readonly schedules: Schedule[];
  constructor(
    id: string,
    name: string,
    schedules: Schedule[],
    description?: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.schedules = schedules;
  }
}

export class Schedule {
  readonly date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}
