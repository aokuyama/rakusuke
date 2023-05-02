import { PrimitiveValueObject, StructValueObject } from "../valueobject";
import { AttendanceArgs, AttendanceList } from "../event/attendance";
import { EventPath } from "../event/path";

interface GuestProps {
  readonly eventPath: EventPath;
  readonly name: GuestName;
  readonly attendance: AttendanceList;
}

interface GuestArgs {
  readonly eventPath: string;
  readonly name: string;
  readonly attendance: AttendanceArgs[];
}

export class Guest extends StructValueObject<GuestProps, GuestArgs> {
  static create(args: GuestArgs): Guest {
    return new Guest({
      eventPath: new EventPath(args.eventPath),
      name: new GuestName(args.name),
      attendance: AttendanceList.new(args.attendance),
    });
  }
  protected validate(value: GuestProps): void {
    // throw new Error("Method not implemented.");
  }
}

export class GuestName extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length == 0) {
      throw new Error("guest must have a name");
    }
    if (value.length > 30) {
      throw new Error("name must be 30 characters or less");
    }
  }
}

export class GuestID extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length == 0) {
      throw new Error("guest must have a id");
    }
    if (value.length > 30) {
      throw new Error("id must be 30 characters or less");
    }
  }
}
