import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { EventPath } from "./path";

interface UpdateEventArgs {
  path: string;
  name: string;
  dates: string[];
  description?: string | undefined;
}

interface UpdateEventProps {
  readonly path: EventPath;
  readonly name: EventName;
  readonly description?: string;
  readonly dates: EventDates;
}

export class UpdateEvent extends StructValueObject<
  UpdateEventProps,
  UpdateEventArgs
> {
  protected validate(value: UpdateEventProps): void {
    //throw new Error("Method not implemented.");
  }
  static new(args: UpdateEventArgs): UpdateEvent {
    return new UpdateEvent({
      path: new EventPath(args.path),
      name: new EventName(args.name),
      description: args.description,
      dates: EventDates.new(args.dates),
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
