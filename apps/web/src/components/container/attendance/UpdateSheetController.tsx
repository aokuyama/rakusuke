import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { UpdateSheet } from "./UpdateSheet";
import { EventGuest } from "domain/src/model/guest";

interface Props {
  guest: EventGuest | null;
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const UpdateSheetController: FC<Props> = ({
  guest,
  event,
  setEvent,
}) => {
  if (!guest) {
    return <></>;
  }

  return (
    <UpdateSheet
      key={guest.number}
      guest={guest}
      event={event}
      setEvent={setEvent}
    />
  );
};
