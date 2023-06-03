import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Sheet } from "./Sheet";
import { EventGuest } from "domain/src/model/guest";
import { Guest } from "./GuestList";

interface Props {
  guests: Guest[];
  event: CurrentEvent;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
  onJoinHandler: () => void;
}

export const GuestOverview: FC<Props> = ({
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
