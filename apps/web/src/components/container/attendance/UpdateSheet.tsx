import { FC, useContext } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { Form } from "@/components/presenter/attendance_sheet/Form";
import {
  GuestUpsert,
  useGuestForm,
} from "@/components/presenter/attendance_sheet/useGuestForm";
import { loadingContext } from "@/hooks/useLoading";

interface Props {
  guest: EventGuest;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const UpdateSheet: FC<Props> = ({
  guest,
  event,
  eventUpdatedHandler,
}) => {
  const ctx = useContext(loadingContext);

  const publish = async (g: GuestUpsert) => {
    ctx.setAsLoading();
    const result = await client.event.updateAttendance.mutate({
      event: event.path,
      guest: Object.assign(g, { number: guest.number }),
    });
    ctx.setAsNotLoading();
    if (result.guest) {
      eventUpdatedHandler(event.replaceGuest(EventGuest.new(result.guest)));
    } else {
      console.error(result);
    }
  };

  return (
    <Form
      dateList={event._schedules.dates()}
      onSubmit={publish}
      form={useGuestForm({ event, guest })}
    />
  );
};
