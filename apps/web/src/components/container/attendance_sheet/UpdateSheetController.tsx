import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { UpdateSheet } from "./UpdateSheet";

interface Props {
  guestNumber: number | null;
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const UpdateSheetController: FC<Props> = ({
  guestNumber,
  event,
  setEvent,
}) => {
  if (!guestNumber) {
    return <></>;
  }
  const guest = event.getGuestByNumber(guestNumber);

  return <UpdateSheet guest={guest} event={event} setEvent={setEvent} />;
};
