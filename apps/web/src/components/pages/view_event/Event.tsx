import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Title } from "ui/src/components/Title";
import { UpdateSheetController } from "@/components/container/attendance/UpdateSheetController";
import { EventGuest } from "domain/src/model/guest";
import { NewSheetModal } from "@/components/container/attendance/NewSheetModal";
import { storage } from "@/registry";
import { List } from "@/components/container/attendance/List";
import { Modal } from "ui/src/components/Modal";
import { EventUpdateFormModal } from "@/components/container/event_setting/EventUpdateFormModal";

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
      <Title>{event.name}</Title>
      {event.isOrganizer && (
        <EventUpdateFormModal
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
      <List event={event} setTargetGuest={setTargetGuest} />
      <NewSheetModal event={event} setEvent={setEvent} />
      <Modal
        isOpen={!!targetGuest}
        onRequestClose={() => {
          setTargetGuest(null);
        }}
      >
        <UpdateSheetController
          guest={targetGuest}
          event={event}
          setEvent={setEvent}
        />
      </Modal>
    </>
  );
};
