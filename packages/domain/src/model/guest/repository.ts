import { EventPath } from "../event/path";
import { NewGuest } from "./guest";
import { GuestNumber } from "./number";

export interface GuestRepository {
  create: (eventPath: EventPath, guest: NewGuest) => Promise<GuestNumber>;
}
