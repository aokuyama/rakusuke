import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Sheet } from "ui/src/components/attendance/Sheet";
import { EventGuest } from "domain/src/model/guest";
import { Guest } from "ui/src/components/attendance/GuestList";

interface Props {
  guests: Guest[];
  event: UpcomingEvent;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
  onJoinHandler: () => void;
}

export const Body: FC<Props> = ({
  guests,
  event,
  setTargetGuest,
  onJoinHandler,
}) => {
  const tableTrClickIdHandler = (id: number | string) => {
    const number = parseInt(String(id));
    if (number) {
      const guest = event.getGuestByNumber(number);
      setTargetGuest(guest);
    } else {
      setTargetGuest(null);
    }
  };

  return (
    <>
      <Sheet
        guests={guests}
        clickIdHandler={tableTrClickIdHandler}
        onJoinHandler={onJoinHandler}
      />
    </>
  );
};
