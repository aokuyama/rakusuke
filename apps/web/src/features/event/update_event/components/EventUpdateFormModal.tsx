import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventUpdateForm } from "./EventUpdateForm";
import { User } from "domain/src/model/user";
import { Modal } from "ui/src/components/Modal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
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
          eventUpdatedHandler={(e) => {
            eventUpdatedHandler(e);
            onRequestClose();
          }}
        />
      </Modal>
    </>
  );
};