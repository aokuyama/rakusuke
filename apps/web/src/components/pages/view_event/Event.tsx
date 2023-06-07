import { FC, useState, useContext, useEffect } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { storage } from "@/registry";
import { EventUpdateFormModal } from "@/features/event/update_event/components/EventUpdateFormModal";
import { EventOverview } from "@/features/event/view_event/components/EventOverview";
import { NewSheetModal } from "@/features/guest/join_as_guest/components/NewSheetModal";
import { UpdateSheetModal } from "@/features/guest/update_guest/components/UpdateSheetModal";
import { GuestOverview } from "@/features/guest/view_guest/components/GuestOverview";
import { FocusDay } from "@/features/event/decide_on_event_date/components/FocusDay";
import { decideOnEventDate } from "@/features/event/decide_on_event_date/trpc";
import { Date } from "domain/src/model/event/date";
import { loadingContext } from "@/hooks/useLoading";
import { DrawingFormModal } from "@/features/event/drawing_event_date/components/DrawingFormModal";

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
  const [focus, setFocus] = useState<{
    id: string;
    date: Date;
    selected: boolean;
    attendees: {
      name: string;
    }[];
  }>();
  const ctx = useContext(loadingContext);
  const user = storage.getUser();
  const [focusDay, setFocusDay] = useState<string | undefined>();

  const eventUpdatedHandler = (event: CurrentEvent) => {
    setEvent(event);
  };

  useEffect(() => {
    const d = event.heldDate();
    setFocusDay(d ? d.id() : undefined);
  }, [event]);

  useEffect(() => {
    if (!focusDay) {
      setFocus(undefined);
      return;
    }
    const { dates } = event.dateMap();
    for (const d of dates) {
      if (d.id === focusDay) {
        setFocus(d);
        return;
      }
    }
  }, [event, focusDay]);

  const { dates, guests } = event.dateMap();
  const summary = dates.map((d) => {
    return {
      id: d.id,
      date: d.date,
      length: d.attendees.length,
      strong: d.strong,
      selected: d.selected,
    };
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

  const decideHandler = (date: Date) => {
    ctx.setAsLoading();
    decideOnEventDate(user, event, date, (e: CurrentEvent) => {
      eventUpdatedHandler(e);
      ctx.setAsNotLoading();
    });
  };

  return (
    <>
      <EventOverview
        name={event.name}
        summary={summary}
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
        setFocus={setFocusDay}
        focusId={focusDay}
      />
      <DrawingFormModal
        schedules={summary}
        isOpen={isDrawingFormOpen}
        setIsOpen={setIsDrawingFormOpen}
        user={user}
        event={event}
        eventUpdatedHandler={eventUpdatedHandler}
      />
      {focus && (
        <FocusDay
          args={focus}
          closeHandler={() => {
            console.log(undefined);
            setFocusDay(undefined);
          }}
          buttonClickHandler={event.isOrganizer ? decideHandler : undefined}
        />
      )}
      <GuestOverview
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
