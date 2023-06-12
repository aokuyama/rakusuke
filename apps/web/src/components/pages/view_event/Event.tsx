import { FC, useState, useEffect } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { EventUpdateFormModal } from "@/features/event/update_event/components/EventUpdateFormModal";
import { EventOverview } from "@/features/event/view_event/components/EventOverview";
import { NewSheetModal } from "@/features/guest/join_as_guest/components/NewSheetModal";
import { UpdateSheetModal } from "@/features/guest/update_guest/components/UpdateSheetModal";
import { GuestOverview } from "@/features/guest/view_guest/components/GuestOverview";
import { FocusDay } from "@/features/event/decide_on_event_date/components/FocusDay";
import { DrawingFormModal } from "@/features/event/drawing_event_date/components/DrawingFormModal";
import { EventDate } from "@/features/event/decide_on_event_date/types";

interface Props {
  event: CurrentEvent;
  setEvent: (event: CurrentEvent) => void;
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
  const [isDrawingFormOpen, setIsDrawingFormOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<EventDate>();

  const eventUpdatedHandler = (event: CurrentEvent) => {
    setEvent(event);
  };

  useEffect(() => {
    const held = event.heldDate();
    if (held) {
      const { dates } = event.scheduleDateMap();
      for (const d of dates) {
        if (held.equals(d.date)) {
          setFocus(d);
          return;
        }
      }
    }
    setFocus(undefined);
  }, [event]);

  return (
    <>
      <EventOverview
        event={event}
        onEdit={
          event.isOrganizer
            ? () => {
                setIsEventUpdateFormOpen(true);
              }
            : undefined
        }
        onDrawing={
          event.isOrganizer
            ? () => {
                setIsDrawingFormOpen(true);
              }
            : undefined
        }
        setFocus={setFocus}
        focus={focus}
      />
      <DrawingFormModal
        event={event}
        isOpen={isDrawingFormOpen}
        setIsOpen={setIsDrawingFormOpen}
        eventUpdatedHandler={eventUpdatedHandler}
      />
      {focus && (
        <FocusDay
          args={focus}
          closeHandler={() => {
            setFocus(undefined);
          }}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
      <GuestOverview
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
        eventUpdatedHandler={eventUpdatedHandler}
      />
      {targetGuest && (
        <UpdateSheetModal
          guest={targetGuest}
          setGuest={setTargetGuest}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
    </>
  );
};
