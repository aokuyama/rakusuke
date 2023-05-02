import { Guest } from "./guest";
import { GuestNumber } from "./number";

export interface GuestRepository {
  create: (guest: Guest) => Promise<GuestNumber>;
}
