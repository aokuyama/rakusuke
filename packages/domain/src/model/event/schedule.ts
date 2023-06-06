import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "./date";
import { EventDates } from "./date_list";

interface ScheduleProps {
  readonly date: Date;
  readonly held: boolean;
}

interface ScheduleArgs {
  readonly date: string;
  readonly held: boolean;
}

export class Schedule extends StructValueObject<ScheduleProps, ScheduleArgs> {
  static new(args: ScheduleArgs): Schedule {
    return new Schedule({
      date: new Date(args.date),
      held: args.held,
    });
  }
  static create(args: { date: Date }): Schedule {
    return new Schedule({
      date: args.date,
      held: false,
    });
  }

  protected validate(value: ScheduleProps): void {
    // throw new Error("Method not implemented.");
  }
  get date(): string {
    return this._date.toString();
  }
  get _date(): Date {
    return this._value.date;
  }
  get held(): boolean {
    return this._value.held;
  }
  equalsDate = (date: Date) => this._date.equals(date);
}

export class Schedules extends ArrayValueObject<Schedule, ScheduleArgs> {
  private _eventDates: EventDates | undefined = undefined;
  constructor(args: Schedule[]) {
    args.sort((a, b) => a._date.unixtime() - b._date.unixtime());
    super(args);
  }
  static new(value: ScheduleArgs[]): Schedules {
    return new Schedules(value.map((v) => Schedule.new(v)));
  }
  static create(value: { date: string }[]): Schedules {
    return new Schedules(
      value.map((v) => Schedule.new(Object.assign(v, { held: false })))
    );
  }
  protected validate(value: Schedule[]): void {
    // EventDatesのバリデートを流用している
    this._eventDates = new EventDates(value.map((s) => s._date));
  }
  protected eventDates = (): EventDates => {
    if (!this._eventDates) {
      this._eventDates = new EventDates(this._value.map((s) => s._date));
    }
    return this._eventDates;
  };
  dates = () =>
    this._value.map((s) => {
      return s._date;
    });
  getByDate = (date: Date): Schedule | null => {
    for (const s of this._value) {
      if (s.equalsDate(date)) {
        return s;
      }
    }
    return null;
  };
  updateDates = (
    newDates: EventDates
  ): {
    schedules: Schedules;
    addedDates: Date[];
    removedDates: Date[];
  } => {
    const addedDates = [];
    const removedDates = [];
    for (const date of newDates._dates) {
      if (!this.eventDates().includes(date)) {
        addedDates.push(date);
      }
    }
    for (const date of this.eventDates()._dates) {
      if (!newDates.includes(date)) {
        removedDates.push(date);
      }
    }
    const schedules: Schedule[] = [];
    for (const date of newDates._dates) {
      const schedule = this.getByDate(date);
      if (schedule) {
        schedules.push(schedule);
      } else {
        schedules.push(Schedule.create({ date: date }));
      }
    }
    return {
      schedules: new Schedules(schedules),
      addedDates: addedDates,
      removedDates: removedDates,
    };
  };
  makeHeldUpdatedSchedules = (
    held: Date
  ): { schedules: Schedules; updatedSchedules: Schedule[] } => {
    let found = false;
    const updatedSchedules: Schedule[] = [];
    const schedules: Schedule[] = [];
    for (const schedule of this._value) {
      if (schedule.equalsDate(held)) {
        found = true;
        if (!schedule.held) {
          const heldSchedule = new Schedule({
            date: schedule._date,
            held: true,
          });
          schedules.push(heldSchedule);
          updatedSchedules.push(heldSchedule);
        } else {
          schedules.push(schedule);
        }
      } else {
        if (schedule.held) {
          const noHeldSchedule = new Schedule({
            date: schedule._date,
            held: false,
          });
          schedules.push(noHeldSchedule);
          updatedSchedules.push(noHeldSchedule);
        } else {
          schedules.push(schedule);
        }
      }
    }
    if (!found) {
      throw new Error("undefined date:" + held.toString());
    }
    return {
      schedules: new Schedules(schedules),
      updatedSchedules,
    };
  };
}
