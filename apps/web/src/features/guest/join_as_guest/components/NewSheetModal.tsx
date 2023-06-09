import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { NewSheet } from "./NewSheet";
import { Modal } from "ui/src/components/Modal";
import { useGuestDefault } from "../hooks/useGuestDefault";

interface Props {
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewSheetModal: FC<Props> = ({
  event,
  eventUpdatedHandler,
  isOpen,
  onRequestClose,
}) => {
  const guest = useGuestDefault();

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <NewSheet
        event={event}
        guest={guest}
        eventUpdatedHandler={(e) => {
          eventUpdatedHandler(e);
          onRequestClose();
        }}
      />
    </Modal>
  );
};
