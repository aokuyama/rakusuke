import { FC } from "react";
import { Calendar } from "@/components/presenter/event/Calendar";
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
  const onCalendarChange = (d: Date) => {
    const newList = dateList.toggleByDate(d);
    if (newList.length() == dateList.length()) {
      // TODO 日付数制限越えの警告を出す
      console.warn("date limit over");
      return;
    }
    setDateList(newList);
  };

  return (
    <>
      <Calendar dateList={dateList} onChangeFunc={onCalendarChange} />
      <List items={items} />
    </>
  );
};
