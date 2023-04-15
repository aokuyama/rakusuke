import { Date } from "./date";

export class Event {
  id: string;
  name: string;
  description?: string;
  schedules: Schedule[];
  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.schedules = [];
  }
}

export class Schedule {
  date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}
