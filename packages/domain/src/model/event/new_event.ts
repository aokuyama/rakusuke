import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { EventPath } from "./path";

interface NewEventArgs {
  name: string;
  dates: string[];
  description?: string | undefined;
}

interface NewEventProps {
  readonly path: EventPath;
  readonly name: EventName;
  readonly description?: string;
  readonly dates: EventDates;
}

export class NewEvent extends StructValueObject<NewEventProps, NewEventArgs> {
  protected validate(value: NewEventProps): void {
    //throw new Error("Method not implemented.");
  }
  static create(args: NewEventArgs): NewEvent {
    return new NewEvent({
      path: EventPath.create(),
      name: new EventName(args.name),
      description: args.description,
      dates: EventDates.new(args.dates),
    });
  }
  get name(): string {
    return this._value.name.value;
  }
  get path(): string {
    return this._value.path.value;
  }
  protected get _path(): EventPath {
    return this._value.path;
  }
  get dates(): string[] {
    return this._value.dates.value;
  }
  get _dates(): EventDates {
    return this._value.dates;
  }
  hashedPath = (): string => this._path.hashed();
}
