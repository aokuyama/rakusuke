import { Date } from "./date";
import { EventName } from "./name";
import { EventPath } from "./path";

interface NewEventArgs {
  name: string;
  dates: string[];
  description?: string | undefined;
}

export class NewEvent {
  readonly _path: EventPath;
  readonly _name: EventName;
  readonly description?: string;
  readonly _dates: EventDates;
  constructor(args: NewEventArgs) {
    this._path = EventPath.create();
    this._name = new EventName(args.name);
    this.description = args.description;
    this._dates = new EventDates(args.dates);
  }
  get name(): string {
    return this._name.value;
  }
  get path(): string {
    return this._path.value;
  }
  get dates(): string[] {
    return this._dates.value;
  }
}

class EventDates {
  readonly _value: readonly Date[];
  constructor(value: string[]) {
    if (value.length == 0) {
      throw new Error("at least one date is required");
    }
    if (value.length > 20) {
      throw new Error("dates must be 20 num or less");
    }
    this._value = Object.freeze(value.map((d) => new Date(d)));
    if (new Set(this._value.map((d) => d.id())).size != this._value.length) {
      throw new Error("duplicate date");
    }
  }
  get value(): string[] {
    return this._value.map((d) => d.toString());
  }
}
