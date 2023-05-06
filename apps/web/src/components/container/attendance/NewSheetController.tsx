import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { NewSheet } from "./NewSheet";

interface Props {
  guest: EventGuest | null;
  event: UpcomingEvent;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const NewSheetController: FC<Props> = ({ guest, event, setEvent }) => {
  if (guest) {
    return <></>;
  }

  return <NewSheet event={event} setEvent={setEvent} />;
};
