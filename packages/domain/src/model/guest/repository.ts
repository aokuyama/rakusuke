import { EventPath } from "../event/path";
import { EventGuest } from "./event_guest";
import { NewGuest } from "./guest";

export interface GuestRepository {
  create: (eventPath: EventPath, guest: NewGuest) => Promise<EventGuest>;
}
