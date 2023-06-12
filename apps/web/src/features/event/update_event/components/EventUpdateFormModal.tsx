import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventUpdateForm } from "./EventUpdateForm";
import { Modal } from "ui/src/components/Modal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const EventUpdateFormModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  event,
  eventUpdatedHandler,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EventUpdateForm
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
          submitedHandler={onRequestClose}
        />
      </Modal>
    </>
  );
};
