import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { NewSheet } from "./NewSheet";
import { Modal } from "ui/src/components/Modal";

interface Props {
  event: CurrentEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<CurrentEvent | null | undefined>
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
