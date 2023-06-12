import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Modal } from "ui/src/components/Modal";
import { DrawingForm } from "./DrawingForm";

interface Props {
  event: CurrentEvent;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const DrawingFormModal: FC<Props> = ({
  event,
  isOpen,
  setIsOpen,
  eventUpdatedHandler,
}) => {
  const onRequestClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <DrawingForm
        event={event}
        eventUpdatedHandler={eventUpdatedHandler}
        submitedHandler={onRequestClose}
      />
    </Modal>
  );
};
