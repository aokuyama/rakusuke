import { FC, useState, useEffect } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventUpdateFormModal } from "@/features/event/update_event/components/EventUpdateFormModal";
import { EventOverview } from "@/features/event/view_event/components/EventOverview";
import { FocusDay } from "@/features/event/decide_on_event_date/components/FocusDay";
import { DrawingFormModal } from "@/features/event/drawing_event_date/components/DrawingFormModal";
import { EventDate } from "@/features/event/decide_on_event_date/types";

interface Props {
  event: CurrentEvent;
  setEvent: (event: CurrentEvent) => void;
}

export const EventColumn: FC<Props> = ({ event, setEvent }) => {
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
    </>
  );
};
