import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { NewSheetModal } from "@/components/container/attendance/NewSheetModal";
import { storage } from "@/registry";
import { Body } from "@/components/container/attendance/Body";
import { EventUpdateFormModal } from "@/components/container/event_setting/EventUpdateFormModal";
import { Overview } from "@/components/presenter/event/Overview";
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
  const [isNewGuestFormOpen, setIsNewGuestFormOpen] = useState<boolean>(false);
  const [isEventUpdateFormOpen, setIsEventUpdateFormOpen] =
    useState<boolean>(false);
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
      <Overview
        name={event.name}
        onClick={
          event.isOrganizer
            ? () => {
                setIsEventUpdateFormOpen(true);
              }
            : undefined
        }
      />
      <Body
        event={event}
        setTargetGuest={setTargetGuest}
        onJoinHandler={() => {
          setIsNewGuestFormOpen(true);
        }}
      />
      {event.isOrganizer && (
        <EventUpdateFormModal
          isOpen={isEventUpdateFormOpen}
          onRequestClose={() => {
            setIsEventUpdateFormOpen(false);
          }}
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
      <NewSheetModal
        isOpen={isNewGuestFormOpen}
        onRequestClose={() => {
          setIsNewGuestFormOpen(false);
        }}
        event={event}
        setEvent={setEvent}
      />
      {targetGuest && (
        <UpdateSheetModal
          guest={targetGuest}
          setGuest={setTargetGuest}
          event={event}
          setEvent={setEvent}
        />
      )}
    </>
  );
};
