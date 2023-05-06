import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { NewSheet } from "./NewSheet";
import { Modal } from "ui/src/components/Modal";
import { Button } from "ui/src/components/Button";

interface Props {
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const NewSheetModal: FC<Props> = ({ event, setEvent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        参加する！
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <NewSheet event={event} setEvent={setEvent} />
      </Modal>
    </>
  );
};
