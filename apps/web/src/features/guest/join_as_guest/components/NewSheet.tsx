import { FC, useContext } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { GuestForm } from "./GuestForm";
import { loadingContext } from "@/hooks/useLoading";
import { GuestUpsert, useGuestForm } from "../hooks/useGuestForm";

interface Props {
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const NewSheet: FC<Props> = ({ event, eventUpdatedHandler }) => {
  const ctx = useContext(loadingContext);

  const publish = async (guest: GuestUpsert) => {
    ctx.setAsLoading();
    const result = await client.event.respondAttendance.mutate({
      event: event.path,
      guest: guest,
    });
    ctx.setAsNotLoading();
    if (result.guest) {
      eventUpdatedHandler(event.pushGuest(EventGuest.new(result.guest)));
    } else {
      console.error(result);
    }
  };

  return (
    <GuestForm
      dateList={event._schedules.dates()}
      onSubmit={publish}
      form={useGuestForm()}
    />
  );
};
