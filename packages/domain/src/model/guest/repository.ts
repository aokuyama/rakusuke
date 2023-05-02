import { Guest, GuestID } from "./guest";

export interface GuestRepository {
  create: (guest: Guest) => Promise<GuestID>;
}
