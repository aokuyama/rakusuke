import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Modal } from "ui/src/components/Modal";
import { EventGuest } from "domain/src/model/guest";
import { UpdateSheet } from "./UpdateSheet";

interface Props {
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
  guest: EventGuest;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const UpdateSheetModal: FC<Props> = ({
  event,
  setEvent,
  guest,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <UpdateSheet
        guest={guest}
        event={event}
        eventUpdatedHandler={(e) => {
          setEvent(e);
          onRequestClose();
        }}
      />
    </Modal>
  );
};
