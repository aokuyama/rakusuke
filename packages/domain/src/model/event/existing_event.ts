import { EventGuestArgs, EventGuestList } from "../guest";
import { UserID } from "../user";
import { StructValueObject } from "../valueobject";
import { EventName } from "./name";
import { EventPath } from "./path";
import { Schedule, Schedules } from "./schedule";
import { Date } from "./date";
import { CurrentEvent } from "./event";
import { UUID } from "../uuid";
import { EventDescription } from "./description";

export interface ExistingEventArgs {
  uuid: string;
  id: number;
  organizerId: number;
  path: string;
  name: string;
  schedules: { date: string; held: boolean }[];
  guests: EventGuestArgs[];
  description?: string;
  created: string;
}

interface ExistingEventProps {
  readonly uuid: UUID;
  readonly id: number; //  TODO 型定義した方が良い
  readonly organizerId: UserID;
  readonly path: EventPath;
  readonly name: EventName;
  readonly description: EventDescription;
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
  static new(args: {
    uuid: string;
    id: number;
    organizerId: number;
    path: EventPath;
    name: string;
    schedules: { date: string; held: boolean }[];
    guests: EventGuestArgs[];
    description?: string | undefined;
    created: string;
  }): ExistingEvent {
    return new ExistingEvent({
      uuid: new UUID(args.uuid),
      id: args.id,
      organizerId: new UserID(args.organizerId),
      name: new EventName(args.name),
      path: args.path,
      schedules: Schedules.new(args.schedules),
      guests: EventGuestList.new(args.guests),
      description: new EventDescription(args.description),
      created: new Date(args.created),
    });
  }
  protected get _uuid(): UUID {
    return this._value.uuid;
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
  get description(): string | undefined {
    return this._value.description.value;
  }
  protected get _name(): EventName {
    return this._value.name;
  }
  private get _description(): EventDescription {
    return this._value.description;
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
  schedules = (): Schedules => this._schedules;

  isOrganizer = (userId: UserID) => this._organizerId.equals(userId);
  makeUpdateEvent = (args: {
    name?: EventName;
    schedules: Schedules;
    description?: EventDescription;
  }): ExistingEvent => {
    return new ExistingEvent({
      uuid: this._uuid,
      id: this._id,
      organizerId: this._organizerId,
      name: args.name !== undefined ? args.name : this._name,
      path: this._path,
      schedules: args.schedules,
      guests: this._guests,
      description:
        args.description !== undefined ? args.description : this._description,
      created: this._created,
    });
  };

  makeHeldUpdatedSchedules = (
    held: Date
  ): { schedules: Schedules; updatedSchedules: Schedule[] } =>
    this.schedules().makeHeldUpdatedSchedules(held);

  toFront = (id: UserID | null): CurrentEvent =>
    new CurrentEvent({
      uuid: this._uuid,
      name: this._name,
      path: this._path,
      isOrganizer: id ? this.isOrganizer(id) : false,
      schedules: this._schedules,
      guests: this._guests,
      description: this._description,
      created: this._created,
    });
}
