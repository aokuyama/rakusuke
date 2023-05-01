import { ArrayValueObject, StructValueObject } from "../valueobject";
import { Date } from "./date";
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
  get dates(): string[] {
    return this._value.dates.value;
  }
}

class EventDates extends ArrayValueObject<Date, string> {
  static new(args: string[]): EventDates {
    return new EventDates(args.map((d) => new Date(d)));
  }
  protected validate(value: Date[]): void {
    if (value.length == 0) {
      throw new Error("at least one date is required");
    }
    if (value.length > 20) {
      throw new Error("dates must be 20 num or less");
    }
    if (new Set(value.map((d) => d.id())).size != value.length) {
      throw new Error("duplicate date");
    }
  }
}
