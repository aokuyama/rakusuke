import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "../date";
import { EventDates } from "./date_list";
import { EventGuest, EventGuestList } from "../guest";
import { arrayMax } from "../../util";

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

type ScheduleMap = {
  id: string;
  date: Date;
  attendees: EventGuest[];
  strong: boolean;
  selected: boolean;
};

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
    updatedSchedules: Schedule[];
  } => {
    const addedDates = [];
    const removedDates = [];
    const updatedSchedules = [];
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
      } else {
        schedules.push(Schedule.create({ date: date }));
      }
    }
    return {
      schedules: new Schedules(schedules),
      addedDates: addedDates,
      removedDates: removedDates,
      updatedSchedules: updatedSchedules,
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
  makeNoHeldSchedules = (): {
    schedules: Schedules;
    updatedSchedules: Schedule[];
  } => {
    const updatedSchedules: Schedule[] = [];
    const schedules: Schedule[] = [];
    for (const schedule of this._value) {
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
    return {
      schedules: new Schedules(schedules),
      updatedSchedules,
    };
  };
  heldDate = (): Date | undefined => {
    for (const s of this._value) {
      if (s.held) {
        return s._date;
      }
    }
    return undefined;
  };

  dateMap = (guests: EventGuestList): ScheduleMap[] => {
    const dateMap = this.dateScheduleMap(guests);
    return this.makeStrong(dateMap);
  };

  dateScheduleMap = (guests: EventGuestList): ScheduleMap[] => {
    return this._value.map((schedule) => {
      const attendees = guests.attendeesByDate(schedule._date);
      return {
        id: schedule._date.id(),
        date: schedule._date,
        attendees: attendees,
        strong: false,
        selected: schedule.held,
      };
    });
  };
  makeStrong = (dateMap: ScheduleMap[]): ScheduleMap[] => {
    const lengths = dateMap.map((d) => {
      return d.attendees.length;
    });
    // 1人以上の参加者がいる日が複数パターンある場合、最も参加人数の多い日を強調する
    const counts = Array.from(new Set(lengths)).filter((v) => v);
    if (counts.length < 2) {
      return dateMap;
    }
    const max = arrayMax(counts);
    return dateMap.map((d) => {
      d.strong = d.attendees.length == max;
      return d;
    });
  };
}
