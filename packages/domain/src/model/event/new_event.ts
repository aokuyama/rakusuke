import { StructValueObject } from "../valueobject";
import { EventDates } from "./date_list";
import { EventName } from "./name";
import { EventPath, NewEventPath } from "./path";
import { UserID } from "../user";
import { NewUUID } from "../uuid";
import { Date } from "./date";
import { validateMaxDate } from "../../service/event";

interface NewEventArgs {
  uuid: string;
  organizerId: number;
  path: string;
  name: string;
  dates: string[];
  description?: string | undefined;
  today: string;
}

interface NewEventProps {
  readonly uuid: NewUUID;
  readonly organizerId: UserID;
  readonly path: NewEventPath;
  readonly name: EventName;
  readonly description?: string;
  readonly dates: EventDates;
  readonly today: Date;
}

export class NewEvent extends StructValueObject<NewEventProps, NewEventArgs> {
  protected validate(value: NewEventProps): void {
    if (!validateMaxDate(value.dates._dates, value.today)) {
      throw new Error("too early to schedule");
    }
  }
  static create(args: {
    organizerId: UserID;
    name: string;
    dates: string[];
    description?: string | undefined;
    today: string;
  }): NewEvent {
    return new NewEvent({
      uuid: NewUUID.create(),
      organizerId: args.organizerId,
      path: NewEventPath.create(),
      name: new EventName(args.name),
      description: args.description,
      dates: EventDates.new(args.dates),
      today: new Date(args.today),
    });
  }
  get uuid(): string {
    return this._value.uuid.value;
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
