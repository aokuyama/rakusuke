import { client } from "infra/src/client/trpc";
import { CurrentEvent } from "domain/src/model/event";
import { GuestUpsert } from "../../join_as_guest/hooks/useGuestForm";
import { EventGuest } from "domain/src/model/guest";

export const createGuestApi = async (
  event: CurrentEvent,
  guest: GuestUpsert,
  then: {
    submited?: () => void;
    success: (args: { event: CurrentEvent; guest: EventGuest }) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  }
) => {
  if (then.submited) {
    then.submited();
  }

  const result = await client.event.respondAttendance.mutate({
    event: event.path,
    guest: guest,
  });

  if (result.guest) {
    const newGuest = EventGuest.new(result.guest);
    then.success({
      event: event.pushGuest(newGuest),
      guest: newGuest,
    });
  } else {
    then.error(result);
  }
  then.finally(result);
};
