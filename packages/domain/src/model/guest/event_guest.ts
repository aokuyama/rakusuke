import { ArrayValueObject, StructValueObject } from "../valueobject";
import { AttendanceArgs, AttendanceList } from "../event/attendance";
import { GuestNumber } from "./number";
import { GuestName } from "./guest";

interface EventGuestProps {
  readonly number: GuestNumber;
  readonly name: GuestName;
  readonly attendance: AttendanceList;
}

export interface EventGuestArgs {
  readonly number: number;
  readonly name: string;
  readonly attendance: AttendanceArgs[];
}

class EventGuest extends StructValueObject<EventGuestProps, EventGuestArgs> {
  static new(args: EventGuestArgs): EventGuest {
    return new EventGuest({
      number: new GuestNumber(args.number),
      name: new GuestName(args.name),
      attendance: AttendanceList.new(args.attendance),
    });
  }
  protected validate(value: EventGuestProps): void {
    // throw new Error("Method not implemented.");
  }
}

export class EventGuestList extends ArrayValueObject<
  EventGuest,
  EventGuestArgs
> {
  static new(args: EventGuestArgs[]) {
    return new EventGuestList(args.map((v) => EventGuest.new(v)));
  }
  protected validate(value: EventGuest[]): void {
    //
  }
}
