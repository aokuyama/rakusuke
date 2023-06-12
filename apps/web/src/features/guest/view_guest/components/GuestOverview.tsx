import { FC, useContext } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { loadingContext } from "@/hooks/useLoading";
import { Button } from "ui/src/components/Button";
import { GuestList } from "./GuestList";

interface Props {
  event: CurrentEvent;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
  onJoinHandler: () => void;
}

export const GuestOverview: FC<Props> = ({
  event,
  setTargetGuest,
  onJoinHandler,
}) => {
  const loadingCtx = useContext(loadingContext);
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
    <section>
      <Button onClick={onJoinHandler} disabled={loadingCtx.loading}>
        入力
      </Button>
      <GuestList event={event} clickIdHandler={tableTrClickIdHandler} />
    </section>
  );
};
