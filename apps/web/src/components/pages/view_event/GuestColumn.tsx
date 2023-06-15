import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { UpdateSheetModal } from "@/features/guest/update_guest/components/UpdateSheetModal";
import { GuestOverview } from "@/features/guest/view_guest/components/GuestOverview";

interface Props {
  event: CurrentEvent;
  setEvent: (event: CurrentEvent) => void;
  targetGuest: EventGuest | null;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const GuestColumn: FC<Props> = ({
  event,
  setEvent,
  targetGuest,
  setTargetGuest,
}) => {
  const eventUpdatedHandler = (event: CurrentEvent) => {
    setEvent(event);
  };

  return (
    <>
      <GuestOverview event={event} setTargetGuest={setTargetGuest} />
      {targetGuest && (
        <UpdateSheetModal
          guest={targetGuest}
          setGuest={setTargetGuest}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
    </>
  );
};
