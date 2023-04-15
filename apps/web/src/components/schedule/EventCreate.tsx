import { FC, useState } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Button } from "ui/src/components/Button";
import { DatePicker } from "@/components/schedule/DatePicker";
import { DateList } from "domain/src/model/event/date_list";

export const EventCreate: FC = () => {
  const [dateList, setDateList] = useState<DateList>(new DateList());

  return (
    <>
      <TextBox />
      <DatePicker dateList={dateList} setDateList={setDateList} />
      <Button>作成</Button>
    </>
  );
};
