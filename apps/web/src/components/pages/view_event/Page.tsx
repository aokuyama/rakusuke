import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Title } from "ui/src/components/Title";
import { Table } from "ui/src/components/Table";
import { UpdateSheetController } from "@/components/container/attendance_sheet/UpdateSheetController";
import { EventGuest } from "domain/src/model/guest";
import { NewSheetController } from "@/components/container/attendance_sheet/NewSheetController";
import { EventUpdateForm } from "@/components/container/event_setting/EventUpdateForm";
import { storage } from "@/registry";
import { UserData } from "@/components/container/dev/UserData";

interface Props {
  event: UpcomingEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
  targetGuest: EventGuest | null;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const Page: FC<Props> = ({
  event,
  setEvent,
  targetGuest,
  setTargetGuest,
}) => {
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

  const tableTrClickIdHandler = (id: number | string) => {
    const number = parseInt(String(id));
    if (number) {
      const guest = event.getGuestByNumber(number);
      setTargetGuest(guest);
    } else {
      setTargetGuest(null);
    }
  };

  const eventUpdatedHandler = (event: UpcomingEvent) => {
    setEvent(event);
  };

  const user = storage.getUser();

  return (
    <>
      <Title>{event.name}</Title>
      <Table
        header={header}
        dataList={dataList}
        clickIdHandler={tableTrClickIdHandler}
      />
      <NewSheetController
        guest={targetGuest}
        event={event}
        setEvent={setEvent}
      />
      <UpdateSheetController
        guest={targetGuest}
        event={event}
        setEvent={setEvent}
      />
      {event.isOrganizer && (
        <EventUpdateForm
          user={user}
          event={event}
          eventUpdatedHandler={eventUpdatedHandler}
        />
      )}
      <UserData user={user} />
    </>
  );
};
