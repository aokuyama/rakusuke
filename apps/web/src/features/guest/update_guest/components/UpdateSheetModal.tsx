import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Modal } from "ui/src/components/Modal";
import { EventGuest } from "domain/src/model/guest";
import { UpdateSheet } from "./UpdateSheet";

interface Props {
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
  guest: EventGuest;
  setGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const UpdateSheetModal: FC<Props> = ({
  event,
  eventUpdatedHandler,
  guest,
  setGuest,
}) => {
  const isOpen = !!guest;
  const onRequestClose = () => {
    setGuest(null);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <UpdateSheet
        guest={guest}
        event={event}
        eventUpdatedHandler={eventUpdatedHandler}
        submitedHandler={onRequestClose}
      />
    </Modal>
  );
};
