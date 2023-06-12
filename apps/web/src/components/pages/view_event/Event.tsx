import { FC, useState, useContext, useEffect } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { EventUpdateFormModal } from "@/features/event/update_event/components/EventUpdateFormModal";
import { EventOverview } from "@/features/event/view_event/components/EventOverview";
import { NewSheetModal } from "@/features/guest/join_as_guest/components/NewSheetModal";
import { UpdateSheetModal } from "@/features/guest/update_guest/components/UpdateSheetModal";
import { GuestOverview } from "@/features/guest/view_guest/components/GuestOverview";
import { FocusDay } from "@/features/event/decide_on_event_date/components/FocusDay";
import { decideOnEventDateApi } from "@/features/event/decide_on_event_date/api/trpc";
import { resetEventDateApi } from "@/features/event/reset_event_date/api/trpc";
import { Date } from "domain/src/model/date";
import { userContext } from "@/hooks/useUser";
import { loadingContext } from "@/hooks/useLoading";
import { DrawingFormModal } from "@/features/event/drawing_event_date/components/DrawingFormModal";
import { Site } from "infra/src/web/site";
import { useToast } from "@/hooks/useToast";

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
  const user = useContext(userContext).user;
  const loadingCtx = useContext(loadingContext);
  const toast = useToast();
  const [focusDay, setFocusDay] = useState<string | undefined>();

  const eventUpdatedHandler = (event: CurrentEvent) => {
    setEvent(event);
  };

  useEffect(() => {
    const d = event.heldDate();
    if (d) {
      setFocusDay(d.id());
    }
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

  const { dates } = event.dateMap();
  const { guests } = event.guestsDateMap();
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
    return { id: g.id, name: g.name, memo: g.memo, attendance: attendance };
  });

  const decideHandler = user
    ? (date: Date | undefined) => {
        loadingCtx.setAsLoading();
        const api = date
          ? (then: {
              success: (args: { event: CurrentEvent }) => void;
              error: (result: any) => void;
              finally: (result: any) => void;
            }) => {
              decideOnEventDateApi(user, event, date, then);
            }
          : (then: {
              success: (args: { event: CurrentEvent }) => void;
              error: (result: any) => void;
              finally: (result: any) => void;
            }) => {
              resetEventDateApi(user, event, then);
            };

        api({
          success: (r) => {
            const held = r.event.heldDate();
            toast.success(
              r.event.name +
                " の開催日を " +
                (held ? held.short() + " に" : "リセット") +
                "しました"
            );
            eventUpdatedHandler(r.event);
          },
          error: (r) => {
            toast.error(Site.message.form.common.error);
            console.error(r);
          },
          finally: () => {
            loadingCtx.setAsNotLoading();
          },
        });
      }
    : undefined;

  return (
    <>
      <EventOverview
        event={event}
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
        event={event}
        eventUpdatedHandler={eventUpdatedHandler}
      />
      {focus && (
        <FocusDay
          args={focus}
          closeHandler={() => {
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
