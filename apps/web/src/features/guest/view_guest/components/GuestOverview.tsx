import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { GuestList } from "./GuestList";
import { SideTitle } from "ui/src/components/SideTitle";
import { Message } from "ui/src/components/Message";

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
      <SideTitle>参加者スケジュール</SideTitle>
      {event.guests.length ? (
        <GuestList event={event} clickIdHandler={tableTrClickIdHandler} />
      ) : (
        <Message type={"unavailable"}>まだ参加希望者がいません</Message>
      )}
    </>
  );
};
