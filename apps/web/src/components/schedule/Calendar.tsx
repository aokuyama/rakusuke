import { FC, useState } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { ScheduleList } from "domain/src/model/event/schedule_list";
import React from "react";

interface Props {
  scheduleList: ScheduleList;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleList>>;
}

export const Calendar: FC<Props> = ({ scheduleList, setSchedule }) => {
  const onChange = (d: Date) => {
    setSchedule(scheduleList.toggleByDate(d));
  };

  return (
    <MultiSelectCalendar
      selectedDates={scheduleList.getGlobalThisDates()}
      locale={"ja-JP"}
      onChangeFunc={onChange}
    />
  );
};
