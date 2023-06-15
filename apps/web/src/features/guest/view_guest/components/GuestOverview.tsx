import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { GuestList } from "./GuestList";
import { SideTitle } from "ui/src/components/SideTitle";

interface Props {
  event: CurrentEvent;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const GuestOverview: FC<Props> = ({ event, setTargetGuest }) => {
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
      <SideTitle>参加者</SideTitle>
      <GuestList event={event} clickIdHandler={tableTrClickIdHandler} />
    </>
  );
};
