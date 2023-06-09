import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Modal } from "ui/src/components/Modal";
import { DrawingForm } from "./DrawingForm";
import { Schedule } from "../../view_event/types/schedule";

interface Props {
  schedules: Schedule[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const DrawingFormModal: FC<Props> = ({
  schedules,
  isOpen,
  setIsOpen,
  event,
  eventUpdatedHandler,
}) => {
  const onRequestClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <DrawingForm
        schedules={schedules}
        event={event}
        eventUpdatedHandler={(e) => {
          eventUpdatedHandler(e);
          onRequestClose();
        }}
      />
    </Modal>
  );
};
