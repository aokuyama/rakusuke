import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Table } from "ui/src/components/Table";
import { EventGuest } from "domain/src/model/guest";

interface Props {
  event: UpcomingEvent;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const List: FC<Props> = ({ event, setTargetGuest }) => {
  const { dates, guests } = event.dateMap();

  const header = dates.map((d) => {
    return { id: d.id, name: d.date.short() };
  });
  header.unshift({ id: "0", name: "" });

  const dataList = guests.map((g) => {
    const items = g.attendance.map((a) => {
      return {
        id: a.id,
        name: a.attend === undefined ? "" : a.attend ? "O" : "X",
      };
    });
    items.unshift({ id: "0", name: g.name });
    return { id: g.id, items: items };
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
      <Table
        header={header}
        dataList={dataList}
        clickIdHandler={tableTrClickIdHandler}
      />
    </>
  );
};
