import { FC } from "react";
import { MultiSelectCalendar } from "ui/src/components/MultiSelectCalendar";
import { EventDateListPickUp } from "domain/src/model/event";
import React from "react";

interface Props {
  dateList: EventDateListPickUp;
  setDateList: React.Dispatch<React.SetStateAction<EventDateListPickUp>>;
}

export const Calendar: FC<Props> = ({ dateList, setDateList }) => {
  const onChange = (d: Date) => {
    const newList = dateList.toggleByDate(d);
    if (newList.length() == dateList.length()) {
      // TODO 日付数制限越えの警告を出す
      console.warn("date limit over");
      return;
    }
    setDateList(newList);
  };

  return (
    <MultiSelectCalendar
      selectedDates={dateList.globalThisDates()}
      locale={"ja-JP"}
      onChangeFunc={onChange}
    />
  );
};
