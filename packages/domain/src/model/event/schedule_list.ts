import { Schedule } from "./event";
import { Date } from "./date";

export class ScheduleList {
  private readonly schedules: Schedule[];
  constructor(schedules: Schedule[] = []) {
    this.schedules = schedules;
    this.schedules.sort((a, b) => a.date.unixtime() - b.date.unixtime());
  }
  toggleByDate = (date: Date | globalThis.Date): ScheduleList => {
    const newSchedules = [];
    if (date instanceof globalThis.Date) {
      date = new Date(date);
    }
    for (const schedule of this.schedules) {
      if (schedule.date.isEqual(date)) {
        continue;
      }
      newSchedules.push(schedule);
    }
    if (newSchedules.length == this.schedules.length) {
      newSchedules.push(new Schedule(date));
    }
    return new ScheduleList(newSchedules);
  };
  length = (): number => this.schedules.length;
  getDateStrings = (): string[] => this.schedules.map((s) => s.date.toString());
  getGlobalThisDates = (): globalThis.Date[] =>
    this.schedules.map((s) => s.date.getGlobalThisDate());
}
