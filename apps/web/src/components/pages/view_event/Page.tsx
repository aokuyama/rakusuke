import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Title } from "ui/src/components/Title";
import { Table } from "ui/src/components/Table";
import { Answer } from "@/components/schedule/Answer";
import { AttendanceList } from "domain/src/model/event/attendance";

interface Props {
  event: UpcomingEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
}

export const Page: FC<Props> = ({ event, setEvent }) => {
  if (event === undefined) {
    return <>loading...</>;
  }
  if (!event) {
    return <>event not found</>;
  }

  const { dates, guests } = event.dateMap();

  const header = dates.map((d) => {
    return { id: d.id, name: d.date };
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

  return (
    <>
      <Title>{event.name}</Title>
      <Table header={header} dataList={dataList} />
      <Answer event={event} setEvent={setEvent} />
    </>
  );
};
