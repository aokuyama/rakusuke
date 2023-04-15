import { FC } from "react";
import { Calendar } from "@/components/schedule/Calendar";
import { List } from "ui/src/components/List";
import { DateList } from "domain/src/model/event/date_list";

interface Props {
  dateList: DateList;
  setDateList: React.Dispatch<React.SetStateAction<DateList>>;
}

export const DatePicker: FC<Props> = ({ dateList, setDateList }) => {
  const items = dateList.getDateStrings().map((date) => {
    return { id: date, name: date };
  });

  return (
    <>
      <Calendar dateList={dateList} setDateList={setDateList} />
      <List items={items} />
    </>
  );
};
