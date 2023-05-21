import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { EventGuest } from "domain/src/model/guest";
import { Form } from "@/components/presenter/attendance_sheet/Form";
import {
  GuestUpsert,
  useGuestForm,
} from "@/components/presenter/attendance_sheet/useGuestForm";

interface Props {
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const NewSheet: FC<Props> = ({ event, eventUpdatedHandler }) => {
  const publish = async (guest: GuestUpsert) => {
    const result = await client.event.respondAttendance.mutate({
      event: event.path,
      guest: guest,
    });
    if (result.guest) {
      eventUpdatedHandler(event.pushGuest(EventGuest.new(result.guest)));
    } else {
      console.error(result);
    }
  };

  return (
    <Form
      dateList={event._schedules.dates()}
      onSubmit={publish}
      form={useGuestForm()}
    />
  );
};
