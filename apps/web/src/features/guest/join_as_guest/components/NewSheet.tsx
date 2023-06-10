import { FC, useContext } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { GuestForm } from "./GuestForm";
import { loadingContext } from "@/hooks/useLoading";
import { GuestUpsert, useGuestForm } from "../hooks/useGuestForm";
import { GuestDefault } from "domain/src/model/guest/default";

interface Props {
  event: CurrentEvent;
  guest: {
    guestDefault: GuestDefault | undefined;
    setGuestDefault: (guest: GuestDefault) => void;
  };
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const NewSheet: FC<Props> = ({ event, guest, eventUpdatedHandler }) => {
  const ctx = useContext(loadingContext);

  const publish = async (g: GuestUpsert) => {
    ctx.setAsLoading();
    const result = await client.event.respondAttendance.mutate({
      event: event.path,
      guest: g,
    });
    ctx.setAsNotLoading();
    if (result.guest) {
      const newGuest = EventGuest.new(result.guest);
      guest.setGuestDefault(newGuest.toDefault());
      eventUpdatedHandler(event.pushGuest(newGuest));
    } else {
      console.error(result);
    }
  };

  const defaultValues = {
    name: guest.guestDefault ? guest.guestDefault.name : "",
    memo: "",
    attendance: event.newAttendance().value,
  };

  return (
    <GuestForm
      dateList={event._schedules.dates()}
      onSubmit={publish}
      form={useGuestForm(defaultValues)}
    />
  );
};
