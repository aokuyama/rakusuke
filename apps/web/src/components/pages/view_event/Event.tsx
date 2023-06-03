import { FC, useState } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { storage } from "@/registry";
import { EventUpdateFormModal } from "@/features/event/update_event/components/EventUpdateFormModal";
import { Overview } from "@/features/event/view_event/components/Overview";
import { NewSheetModal } from "@/features/guest/join_as_guest/components/NewSheetModal";
import { UpdateSheetModal } from "@/features/guest/update_guest/components/UpdateSheetModal";
import { Body } from "@/features/guest/view_guest/components/Body";

interface Props {
  event: CurrentEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<CurrentEvent | null | undefined>
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

  const eventUpdatedHandler = (event: CurrentEvent) => {
    setEvent(event);
  };
  const { dates, guests } = event.dateMap();

  const summary = dates.map((d) => {
    return { id: d.id, name: d.date.short(), length: d.attendees.length };
  });

  const guestList = guests.map((g) => {
    const attendance = g.attendance.map((a) => {
      return {
        id: a.id,
        name: a.date.md(),
        enabled: a.attend,
      };
    });
    return { id: g.id, name: g.name, attendance: attendance };
  });

  return (
    <>
      <Overview
        name={event.name}
        summary={summary}
        onClick={
          event.isOrganizer
            ? () => {
                setIsEventUpdateFormOpen(true);
              }
            : undefined
        }
      />
      <Body
        guests={guestList}
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
