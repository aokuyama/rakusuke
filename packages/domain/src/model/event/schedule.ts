import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "./date";
import { EventDates } from "./date_list";

interface ScheduleProps {
  readonly date: Date;
}

interface ScheduleArgs {
  readonly date: string;
}

class Schedule extends StructValueObject<ScheduleProps, ScheduleArgs> {
  static new(args: ScheduleArgs): Schedule {
    return new Schedule({
      date: new Date(args.date),
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
    return {
      schedules: new Schedules(
        newDates._dates.map((d) => new Schedule({ date: d }))
      ),
      addedDates: addedDates,
      removedDates: removedDates,
    };
  };
}
