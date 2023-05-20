import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { NewSheet } from "./NewSheet";
import { Modal } from "ui/src/components/Modal";

interface Props {
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewSheetModal: FC<Props> = ({
  event,
  setEvent,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <NewSheet
        event={event}
        eventUpdatedHandler={(e) => {
          setEvent(e);
          onRequestClose();
        }}
      />
    </Modal>
  );
};
