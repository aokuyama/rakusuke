import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Title } from "ui/src/components/Title";
import { UpdateSheetController } from "@/components/container/attendance/UpdateSheetController";
import { EventGuest } from "domain/src/model/guest";
import { NewSheetController } from "@/components/container/attendance/NewSheetController";
import { EventUpdateForm } from "@/components/container/event_setting/EventUpdateForm";
import { storage } from "@/registry";
import { UserData } from "@/components/container/dev/UserData";
import { List } from "@/components/container/attendance/List";

interface Props {
  event: UpcomingEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
  targetGuest: EventGuest | null;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const Page: FC<Props> = ({
  event,
  setEvent,
  targetGuest,
  setTargetGuest,
}) => {
  if (event === undefined) {
    return <>loading...</>;
  }
  if (!event) {
    return <>event not found</>;
  }
  const user = storage.getUser();

  const eventUpdatedHandler = (event: UpcomingEvent) => {
    setEvent(event);
  };

  return (
    <>
      <Title>{event.name}</Title>
      <List event={event} setTargetGuest={setTargetGuest} />
      <NewSheetController
        guest={targetGuest}
        event={event}
        setEvent={setEvent}
      />
      <UpdateSheetController
        guest={targetGuest}
        event={event}
        setEvent={setEvent}
      />
      {event.isOrganizer && (
        <EventUpdateForm
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
      <UserData user={user} />
    </>
  );
};
