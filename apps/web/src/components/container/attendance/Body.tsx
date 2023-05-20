import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Sheet } from "ui/src/components/attendance/Sheet";
import { EventGuest } from "domain/src/model/guest";

interface Props {
  event: UpcomingEvent;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
  onJoinHandler: () => void;
}

export const Body: FC<Props> = ({ event, setTargetGuest, onJoinHandler }) => {
  const { dates, guests } = event.dateMap();

  const summary = dates.map((d) => {
    return { id: d.id, name: d.date.short(), length: d.attendees.length };
  });

  const guestList = guests.map((g) => {
    const attendance = g.attendance.map((a) => {
      return {
        id: a.id,
        name: a.date.md(),
        enabled: a.attend,
      };
    });
    return { id: g.id, name: g.name, attendance: attendance };
  });

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
        summary={summary}
        guests={guestList}
        clickIdHandler={tableTrClickIdHandler}
        onJoinHandler={onJoinHandler}
      />
    </>
  );
};
