import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { Date } from "../date";
import { Schedule, Schedules } from "./schedule";
import { validateMaxDate } from "../../service/event";
import { ExistingEvent } from "./existing_event";
import { EventDescription } from "./description";

interface UpdateEventAndDateArgs {
  name: string;
  dates: string[];
  created: string;
  description?: string;
}

interface UpdateEventAndDateProps {
  readonly name: EventName;
  readonly description: EventDescription;
  readonly dates: EventDates;
  readonly created: Date;
}

export interface UpdateEvent {
  makeUpdateSchedules: (beforeEvent: ExistingEvent) => {
    updatedEvent: ExistingEvent;
    addedDates: Date[];
    removedDates: Date[];
    updatedSchedules: Schedule[];
  };
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
      description: new EventDescription(args.description),
      dates: EventDates.new(args.dates),
      created: args.created,
    });
  }
  get _name(): EventName {
    return this._value.name;
  }
  get _description(): EventDescription {
    return this._value.description;
  }
  get _dates(): EventDates {
    return this._value.dates;
  }
  makeUpdateSchedules = (
    beforeEvent: ExistingEvent
  ): {
    updatedEvent: ExistingEvent;
    addedDates: Date[];
    removedDates: Date[];
    updatedSchedules: Schedule[];
  } => {
    const { schedules, addedDates, removedDates } = beforeEvent
      .schedules()
      .updateDates(this._dates);
    // 日付の増減のみなので、Schedule自体の更新はない
    const updatedSchedules: Schedule[] = [];
    return {
      updatedEvent: beforeEvent.makeUpdateEvent({
        name: this._name,
        description: this._description,
        schedules,
      }),
      addedDates,
      removedDates,
      updatedSchedules,
    };
  };
}

export class UpdateEventHeld {
  private readonly held: Date;
  constructor(held: Date) {
    this.held = held;
  }
  static new(args: { held: Date }): UpdateEventHeld {
    return new UpdateEventHeld(args.held);
  }
  makeUpdateSchedules = (
    beforeEvent: ExistingEvent
  ): {
    updatedEvent: ExistingEvent;
    addedDates: Date[];
    removedDates: Date[];
    updatedSchedules: Schedule[];
  } => {
    const { schedules, updatedSchedules } =
      beforeEvent.makeHeldUpdatedSchedules(this.held);
    // 日付の増減はない
    const addedDates: Date[] = [];
    const removedDates: Date[] = [];
    return {
      updatedEvent: beforeEvent.makeUpdateEvent({
        schedules,
      }),
      addedDates,
      removedDates,
      updatedSchedules,
    };
  };
}
