import { client } from "infra/src/client/trpc";
import { CurrentEvent } from "domain/src/model/event";
import { GuestUpsert } from "../../join_as_guest/hooks/useGuestForm";
import { EventGuest, GuestNumber } from "domain/src/model/guest";

export const updateGuestApi = async (
  event: CurrentEvent,
  number: GuestNumber,
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

  const result = await client.event.updateAttendance.mutate({
    event: event.path,
    guest: Object.assign(guest, { number: number.value }),
  });

  if (result.guest) {
    const updatedGuest = EventGuest.new(result.guest);
    then.success({
      event: event.replaceGuest(updatedGuest),
      guest: updatedGuest,
    });
  } else {
    then.error(result);
  }
  then.finally(result);
};
