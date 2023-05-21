import { EventGuestArgs, EventGuestList } from "../guest";
import { UserID } from "../user";
import { StructValueObject } from "../valueobject";
import { EventName } from "./name";
import { EventPath } from "./path";
import { Schedules } from "./schedule";
import { UpdateEvent } from "./update_event";
import { Date } from "./date";
import { CurrentEvent } from "./event";

export interface ExistingEventArgs {
  id: number;
  organizerId: number;
  path: string;
  name: string;
  schedules: { date: string }[];
  guests: EventGuestArgs[];
  description?: string | undefined;
  created: string;
}

interface ExistingEventProps {
  readonly id: number; //  TODO 型定義した方が良い
  readonly organizerId: UserID;
  readonly path: EventPath;
  readonly name: EventName;
  readonly description: string | undefined;
  readonly schedules: Schedules;
  readonly guests: EventGuestList;
  readonly created: Date;
}

export class ExistingEvent extends StructValueObject<
  ExistingEventProps,
  ExistingEventArgs
> {
  protected validate(value: ExistingEventProps): void {
    // throw new Error("Method not implemented.");
  }
  static new(args: ExistingEventArgs): ExistingEvent {
    return new ExistingEvent({
      id: args.id,
      organizerId: new UserID(args.organizerId),
      name: new EventName(args.name),
      path: new EventPath(args.path),
      schedules: Schedules.new(args.schedules),
      guests: EventGuestList.new(args.guests),
      description: args.description,
      created: new Date(args.created),
    });
  }
  get id(): number {
    return this._value.id;
  }
  protected get _id(): number {
    return this._value.id;
  }
  protected get _organizerId(): UserID {
    return this._value.organizerId;
  }
  get name(): string {
    return this._value.name.value;
  }
  protected get _name(): EventName {
    return this._value.name;
  }
  protected get _path(): EventPath {
    return this._value.path;
  }
  protected get _schedules(): Schedules {
    return this._value.schedules;
  }
  protected get _guests(): EventGuestList {
    return this._value.guests;
  }
  get _created(): Date {
    return this._value.created;
  }
  isOrganizer = (userId: UserID) => this._organizerId.equals(userId);
  updateEvent = (
    event: UpdateEvent
  ): {
    updatedEvent: ExistingEvent;
    addedDates: Date[];
    removedDates: Date[];
  } => {
    const { schedules, addedDates, removedDates } = this._schedules.updateDates(
      event._dates
    );
    return {
      updatedEvent: new ExistingEvent({
        id: this._id,
        organizerId: this._organizerId,
        name: event._name,
        path: this._path,
        schedules: schedules,
        guests: this._guests,
        description: this._value.description,
        created: this._created,
      }),
      addedDates: addedDates,
      removedDates: removedDates,
    };
  };
  toFront = (id: UserID | null): CurrentEvent =>
    new CurrentEvent({
      name: this._name,
      path: this._path,
      isOrganizer: id ? this.isOrganizer(id) : false,
      schedules: this._schedules,
      guests: this._guests,
      description: this._value.description,
      created: this._created,
    });
}
