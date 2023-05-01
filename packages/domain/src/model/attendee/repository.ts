import { Attendee, AttendeeID } from "../event/attendee";

export interface AttendeeRepository {
  create: (attendee: Attendee) => Promise<AttendeeID>;
}
