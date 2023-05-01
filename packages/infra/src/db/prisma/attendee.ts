import { AttendeeRepository } from "domain/src/model/attendee";
import { Attendee, AttendeeID } from "domain/src/model/event/attendee";

export class PrismaAttendeeRepository implements AttendeeRepository {
  create = async (attendee: Attendee): Promise<AttendeeID> => {
    console.error(attendee.serialize());
    return new AttendeeID("error");
  };
}
