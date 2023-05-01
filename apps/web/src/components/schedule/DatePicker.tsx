import { FC } from "react";
import { Calendar } from "@/components/schedule/Calendar";
import { List } from "ui/src/components/List";
import { EventDateListPickUp } from "domain/src/model/event";

interface Props {
  dateList: EventDateListPickUp;
  setDateList: React.Dispatch<React.SetStateAction<EventDateListPickUp>>;
}

export const DatePicker: FC<Props> = ({ dateList, setDateList }) => {
  const items = dateList.value.map((date) => {
    return { id: date, name: date };
  });

  return (
    <>
      <Calendar dateList={dateList} setDateList={setDateList} />
      <List items={items} />
    </>
  );
};
