import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Modal } from "ui/src/components/Modal";
import { DrawingForm } from "./DrawingForm";
import { User } from "domain/src/model/user";
import { Schedule } from "../../view_event/types/schedule";

interface Props {
  schedules: Schedule[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const DrawingFormModal: FC<Props> = ({
  schedules,
  isOpen,
  setIsOpen,
  user,
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
        user={user}
        event={event}
        eventUpdatedHandler={(e) => {
          eventUpdatedHandler(e);
          onRequestClose();
        }}
      />
    </Modal>
  );
};
