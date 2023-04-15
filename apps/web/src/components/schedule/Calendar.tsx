import { FC, useState } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { ScheduleList } from "domain/src/model/event/schedule_list";

export const Calendar: FC = () => {
  const [scheduleList, setSchedule] = useState<ScheduleList>(
    new ScheduleList()
  );
  const onChange = (d: Date) => {
    setSchedule(scheduleList.toggleByDate(d));
  };
  const selectedStr = scheduleList
    .getDateStrings()
    .map((d) => {
      return d.toString();
    })
    .join(",");

  return (
    <>
      <MultiSelectCalendar
        selectedDates={scheduleList.getGlobalThisDates()}
        locale={"ja-JP"}
        onChangeFunc={onChange}
      />
      <div>{selectedStr}</div>
    </>
  );
};
