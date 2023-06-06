import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { Date } from "./date";
import { Schedule, Schedules } from "./schedule";
import { validateMaxDate } from "../../service/event";

interface UpdateEventAndDateArgs {
  name: string;
  dates: string[];
  description?: string | undefined;
  created: string;
}

interface UpdateEventAndDateProps {
  readonly name: EventName;
  readonly description?: string;
  readonly dates: EventDates;
  readonly created: Date;
}

export interface UpdateEvent {
  makeUpdateSchedules: (beforeSchedules: Schedules) => {
    schedules: Schedules;
    addedDates: Date[];
    removedDates: Date[];
    updatedSchedules: Schedule[];
  };
  _name: EventName;
}

export class UpdateEventAndDate
  extends StructValueObject<UpdateEventAndDateProps, UpdateEventAndDateArgs>
  implements UpdateEvent
{
  protected validate(value: UpdateEventAndDateProps): void {
    if (!validateMaxDate(value.dates._dates, value.created)) {
      throw new Error("too early to schedule");
    }
  }
  static new(args: {
    name: string;
    dates: string[];
    description?: string | undefined;
    created: Date;
  }): UpdateEventAndDate {
    return new UpdateEventAndDate({
      name: new EventName(args.name),
      description: args.description,
      dates: EventDates.new(args.dates),
      created: args.created,
    });
  }
  get _name(): EventName {
    return this._value.name;
  }
  get _dates(): EventDates {
    return this._value.dates;
  }
  makeUpdateSchedules = (
    beforeSchedules: Schedules
  ): {
    schedules: Schedules;
    addedDates: Date[];
    removedDates: Date[];
    updatedSchedules: Schedule[];
  } => {
    const { schedules, addedDates, removedDates } = beforeSchedules.updateDates(
      this._dates
    );
    // 日付の増減のみなので、Schedule自体の更新はない
    const updatedSchedules: Schedule[] = [];
    return { schedules, addedDates, removedDates, updatedSchedules };
  };
}

export class UpdateEventHeld {}
