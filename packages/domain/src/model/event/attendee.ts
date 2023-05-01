import { PrimitiveValueObject, StructValueObject } from "../valueobject";
import { AttendanceArgs, AttendanceList } from "./attendance";
import { EventPath } from "./path";

interface AttendeeProps {
  readonly eventPath: EventPath;
  readonly name: AttendeeName;
  readonly attendance: AttendanceList;
}

interface AttendeeArgs {
  readonly eventPath: string;
  readonly name: string;
  readonly attendance: AttendanceArgs[];
}

export class Attendee extends StructValueObject<AttendeeProps, AttendeeArgs> {
  static create(args: AttendeeArgs): Attendee {
    return new Attendee({
      eventPath: new EventPath(args.eventPath),
      name: new AttendeeName(args.name),
      attendance: AttendanceList.new(args.attendance),
    });
  }
  protected validate(value: AttendeeProps): void {
    // throw new Error("Method not implemented.");
  }
}

export class AttendeeName extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length == 0) {
      throw new Error("attendee must have a name");
    }
    if (value.length > 30) {
      throw new Error("name must be 30 characters or less");
    }
  }
}

export class AttendeeID extends PrimitiveValueObject<string> {
  protected validate(value: string): void {
    if (value.length == 0) {
      throw new Error("attendee must have a id");
    }
    if (value.length > 30) {
      throw new Error("id must be 30 characters or less");
    }
  }
}
