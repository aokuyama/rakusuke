import {
  EventGuest,
  EventGuestArgs,
  EventGuestDateMap,
  EventGuestList,
} from "../guest";
import { StructValueObject } from "../valueobject";
import { CurrentAttendanceList, NewAttendanceList } from "./attendance";
import { EventName } from "./name";
import { EventPath } from "./path";
import { Schedules } from "./schedule";
import { Date } from "../date";
import { eventMaxDate } from "../../service/event";
import { UUID } from "../uuid";
import { EventDescription } from "./description";

export interface CurrentEventArgs {
  uuid: string;
  path: string;
  name: string;
  readonly isOrganizer: boolean;
  schedules: { date: string; held: boolean }[];
  guests: EventGuestArgs[];
  created: string;
  description?: string | undefined;
}

interface CurrentEventProps {
  readonly uuid: UUID;
  readonly path: EventPath;
  readonly name: EventName;
  readonly description: EventDescription;
  readonly isOrganizer: boolean;
  readonly schedules: Schedules;
  readonly guests: EventGuestList;
  readonly created: Date;
}

export class CurrentEvent
  extends StructValueObject<CurrentEventProps, CurrentEventArgs>
  implements CurrentEventView
{
  protected validate(value: CurrentEventProps): void {
    // throw new Error("Method not implemented.");
  }
  static new(args: CurrentEventArgs): CurrentEvent {
    return new CurrentEvent({
      uuid: new UUID(args.uuid),
      name: new EventName(args.name),
      path: new EventPath(args.path),
      isOrganizer: args.isOrganizer,
      schedules: Schedules.new(args.schedules),
      guests: EventGuestList.new(args.guests),
      description: new EventDescription(args.description),
      created: new Date(args.created),
    });
  }
  sameIdAs = (event: CurrentEvent): boolean => this._uuid.equals(event._uuid);
  samePathAs = (event: CurrentEvent): boolean => this._path.equals(event._path);
  protected get _uuid(): UUID {
    return this._value.uuid;
  }
  get uuid(): string {
    return this._value.uuid.value;
  }
  get name(): string {
    return this._value.name.value;
  }
  protected get _name(): EventName {
    return this._value.name;
  }
  get description(): string | undefined {
    return this._value.description.value;
  }
  get path(): string {
    return this._value.path.value;
  }
  protected get _path(): EventPath {
    return this._value.path;
  }
  get isOrganizer(): boolean {
    return this._value.isOrganizer;
  }
  protected get _isOrganizer(): boolean {
    return this._value.isOrganizer;
  }
  get _schedules(): Schedules {
    return this._value.schedules;
  }
  get guests() {
    return this._value.guests.value;
  }
  protected get _guests(): EventGuestList {
    return this._value.guests;
  }
  private get _created(): Date {
    return this._value.created;
  }
  newAttendance = () =>
    NewAttendanceList.newByDates(
      this._value.schedules.dates().map((date) => {
        return { date: date, attend: false };
      })
    );
  newAttendanceByGuest = (guest: EventGuest) =>
    this.newAttendanceByCurrentAttendance(guest.getAttendance());

  newAttendanceByCurrentAttendance = (
    attendance: NewAttendanceList | CurrentAttendanceList
  ) => {
    return NewAttendanceList.newByDates(
      this._value.schedules.dates().map((date) => {
        const checked =
          attendance.existsDate(date) && attendance.isAttend(date);
        return { date: date, attend: checked };
      })
    );
  };
  scheduleLength = (): number => this._schedules.length();
  scheduleDateMap = (): {
    dates: {
      id: string;
      date: Date;
      attendees: { name: string }[];
      strong: boolean;
      selected: boolean;
    }[];
  } => {
    const dates = this._schedules.dateMap(this._guests);
    return {
      dates: dates,
    };
  };
  guestDateMap = (): {
    guests: EventGuestDateMap[];
  } => {
    return {
      guests: this._guests.dateMap(this._schedules.dates()),
    };
  };
  updatedEvent = (args: {
    name: string;
    description: string;
    schedule: {
      date: string;
      value: string;
      dateObj: Date;
      held: boolean;
    }[];
  }): CurrentEvent => {
    return new CurrentEvent({
      uuid: this._uuid,
      name: new EventName(args.name),
      path: this._path,
      isOrganizer: this._isOrganizer,
      schedules: Schedules.new(args.schedule),
      guests: this._guests,
      description: new EventDescription(args.description),
      created: this._created,
    });
  };
  pushGuest = (guest: EventGuest): CurrentEvent => {
    return new CurrentEvent({
      uuid: this._uuid,
      name: this._name,
      path: this._path,
      isOrganizer: this._isOrganizer,
      schedules: this._schedules,
      guests: this._guests.push(guest),
      description: this._value.description,
      created: this._created,
    });
  };
  replaceGuest = (guest: EventGuest): CurrentEvent => {
    return new CurrentEvent({
      uuid: this._uuid,
      name: this._name,
      path: this._path,
      isOrganizer: this._isOrganizer,
      schedules: this._schedules,
      guests: this._guests.replace(guest),
      description: this._value.description,
      created: this._created,
    });
  };
  getGuestByNumber = (number: number): EventGuest =>
    this._guests.getByNumber(number);
  minDate = (): Date => this._created;
  maxDate = (): Date => eventMaxDate(this.minDate());
  dateSummary = (): string => {
    return this._schedules
      .dates()
      .map((d) => d.short())
      .join(" ");
  };
  heldDate = (): Date | undefined => this._schedules.heldDate();
  getPath = (): EventPath => this._path;
  equalsPath = (path: EventPath): boolean => this._path.equals(path);
  isExist = (): this is CurrentEvent => true;
  isLoading = (): this is CurrentEventLoading => false;
  isNotFound = (): this is CurrentEventNotFound => false;
  isGuestLimit = (): boolean => this._guests.isLimit();
}

export interface CurrentEventView {
  samePathAs: (event: CurrentEvent) => boolean;
  isExist: () => this is CurrentEvent;
  isLoading: () => this is CurrentEventLoading;
  isNotFound: () => this is CurrentEventNotFound;
}

export class CurrentEventLoading implements CurrentEventView {
  private readonly path: EventPath | undefined;
  constructor(path?: string) {
    this.path = path ? EventPath.newSafe(path) : undefined;
  }
  samePathAs = (event: CurrentEvent) =>
    this.path ? this.path.equals(event.getPath()) : false;
  isExist = (): this is CurrentEvent => false;
  isLoading = (): this is CurrentEventLoading => true;
  isNotFound = (): this is CurrentEventNotFound => false;
}

export class CurrentEventNotFound implements CurrentEventView {
  samePathAs = (event: CurrentEvent) => false;
  isExist = (): this is CurrentEvent => false;
  isLoading = (): this is CurrentEventLoading => false;
  isNotFound = (): this is CurrentEventNotFound => true;
}
