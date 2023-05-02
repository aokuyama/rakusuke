import { Guest, GuestID, GuestRepository } from "domain/src/model/guest";

export class PrismaGuestRepository implements GuestRepository {
  create = async (guest: Guest): Promise<GuestID> => {
    console.error(guest.serialize());
    return new GuestID("error");
  };
}
