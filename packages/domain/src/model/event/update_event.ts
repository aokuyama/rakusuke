import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { EventPath } from "./path";
import { Date } from "./date";
import { validateMaxDate } from "../../service/event";

interface UpdateEventArgs {
  path: string;
  name: string;
  dates: string[];
  description?: string | undefined;
  created: string;
}

interface UpdateEventProps {
  readonly path: EventPath;
  readonly name: EventName;
  readonly description?: string;
  readonly dates: EventDates;
  readonly created: Date;
}

export class UpdateEvent extends StructValueObject<
  UpdateEventProps,
  UpdateEventArgs
> {
  protected validate(value: UpdateEventProps): void {
    if (!validateMaxDate(value.dates._dates, value.created)) {
      throw new Error("too early to schedule");
    }
  }
  static new(args: {
    path: EventPath;
    name: string;
    dates: string[];
    description?: string | undefined;
    created: Date;
  }): UpdateEvent {
    return new UpdateEvent({
      path: args.path,
      name: new EventName(args.name),
      description: args.description,
      dates: EventDates.new(args.dates),
      created: args.created,
    });
  }
  get _path(): EventPath {
    return this._value.path;
  }
  get _name(): EventName {
    return this._value.name;
  }
  get _dates(): EventDates {
    return this._value.dates;
  }
}

export class UpdateEventHeld {}
