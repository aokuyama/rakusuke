import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { EventUpdateForm } from "@/components/container/event_setting/EventUpdateForm";
import { User } from "domain/src/model/user";
import { Modal } from "ui/src/components/Modal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User;
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const EventUpdateFormModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  user,
  event,
  eventUpdatedHandler,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EventUpdateForm
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      </Modal>
    </>
  );
};
