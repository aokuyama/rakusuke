import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { EventUpdateForm } from "@/components/container/event_setting/EventUpdateForm";
import { User } from "domain/src/model/user";
import { Button } from "ui/src/components/Button";
import { Modal } from "ui/src/components/Modal";

interface Props {
  user: User;
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const EventUpdateFormModal: FC<Props> = ({
  user,
  event,
  eventUpdatedHandler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        イベント情報を修正
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <EventUpdateForm
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      </Modal>
    </>
  );
};
