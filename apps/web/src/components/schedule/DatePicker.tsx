import { FC, SetStateAction, useState } from "react";
import { Calendar } from "@/components/schedule/Calendar";
import { Item, List } from "ui/src/components/List";
import { ScheduleList } from "domain/src/model/event/schedule_list";

export const DatePicker: FC = () => {
  const [scheduleList, setSchedule] = useState<ScheduleList>(
    new ScheduleList()
  );
  const items = scheduleList.getDateStrings().map((date) => {
    return { id: date, name: date };
  });

  return (
    <>
      <Calendar scheduleList={scheduleList} setSchedule={setSchedule} />
      <List items={items} />
    </>
  );
};
