import { FC } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { DateList } from "domain/src/model/event/date_list";
import React from "react";

interface Props {
  dateList: DateList;
  setDateList: React.Dispatch<React.SetStateAction<DateList>>;
}

export const Calendar: FC<Props> = ({ dateList, setDateList }) => {
  const onChange = (d: Date) => {
    setDateList(dateList.toggleByDate(d));
  };

  return (
    <MultiSelectCalendar
      selectedDates={dateList.getGlobalThisDates()}
      locale={"ja-JP"}
      onChangeFunc={onChange}
    />
  );
};
