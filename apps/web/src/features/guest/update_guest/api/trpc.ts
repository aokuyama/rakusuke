import { client } from "infra/src/client/trpc";
import { CurrentEvent } from "domain/src/model/event";
import { GuestUpsert } from "../../join_as_guest/hooks/useGuestForm";
import { EventGuest, GuestNumber } from "domain/src/model/guest";

export const updateGuestApi = async (
  event: CurrentEvent,
  number: GuestNumber,
  guest: GuestUpsert,
  then: {
    submited: (args: { event: CurrentEvent; guest: EventGuest }) => void;
    success: (args: { event: CurrentEvent; guest: EventGuest }) => void;
    error: (result: any, args: { event: CurrentEvent }) => void;
    finally: (result: any) => void;
  },
) => {
  const guestData = Object.assign(guest, { number: number.value });
  if (then.submited) {
    const tmpGuest = EventGuest.new(guestData);
    then.submited({
      event: event.replaceGuest(tmpGuest),
      guest: tmpGuest,
    });
  }

  const result = await client.event.updateAttendance.mutate({
    event: event.path,
    guest: guestData,
  });

  if (result.guest) {
    const updatedGuest = EventGuest.new(result.guest);
    then.success({
      event: event.replaceGuest(updatedGuest),
      guest: updatedGuest,
    });
  } else {
    then.error(result, { event });
  }
  then.finally(result);
};
