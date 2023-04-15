import { FC, useState } from "react";
import { Calendar } from "@/components/schedule/Calendar";
import { List } from "ui/src/components/List";
import { DateList } from "domain/src/model/event/date_list";

export const DatePicker: FC = () => {
  const [dateList, setDateList] = useState<DateList>(new DateList());
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
