import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { NewSheetModal } from "@/components/container/attendance/NewSheetModal";
import { storage } from "@/registry";
import { List } from "@/components/container/attendance/List";
import { EventUpdateFormModal } from "@/components/container/event_setting/EventUpdateFormModal";
import { Name } from "@/components/presenter/event/Name";
import { UpdateSheetModal } from "@/components/container/attendance/UpdateSheetModal";

interface Props {
  event: UpcomingEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
  targetGuest: EventGuest | null;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const Event: FC<Props> = ({
  event,
  setEvent,
  targetGuest,
  setTargetGuest,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  if (event === undefined) {
    return null;
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
      <Name
        name={event.name}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {event.isOrganizer && (
        <EventUpdateFormModal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
      <NewSheetModal event={event} setEvent={setEvent} />
      <List event={event} setTargetGuest={setTargetGuest} />
      {targetGuest && (
        <UpdateSheetModal
          isOpen={!!targetGuest}
          onRequestClose={() => {
            setTargetGuest(null);
          }}
          guest={targetGuest}
          event={event}
          setEvent={setEvent}
        />
      )}
    </>
  );
};
