import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { EventPath, NewEventPath } from "./path";
import { UserID } from "../user";

interface NewEventArgs {
  organizerId: number;
  path: string;
  name: string;
  dates: string[];
  description?: string | undefined;
}

interface NewEventProps {
  readonly organizerId: UserID;
  readonly path: NewEventPath;
  readonly name: EventName;
  readonly description?: string;
  readonly dates: EventDates;
}

export class NewEvent extends StructValueObject<NewEventProps, NewEventArgs> {
  protected validate(value: NewEventProps): void {
    //throw new Error("Method not implemented.");
  }
  static create(args: {
    organizerId: UserID;
    name: string;
    dates: string[];
    description?: string | undefined;
  }): NewEvent {
    return new NewEvent({
      organizerId: args.organizerId,
      path: NewEventPath.create(),
      name: new EventName(args.name),
      description: args.description,
      dates: EventDates.new(args.dates),
    });
  }
  get organizerId(): number {
    return this._value.organizerId.value;
  }
  get name(): string {
    return this._value.name.value;
  }
  get path(): string {
    return this._value.path.value;
  }
  protected get _path(): NewEventPath {
    return this._value.path;
  }
  get dates(): string[] {
    return this._value.dates.value;
  }
  get _dates(): EventDates {
    return this._value.dates;
  }
  hashedPath = (): string => this._path.hashed();
  getExistingPath = (): EventPath => this._path.toExisting();
}
