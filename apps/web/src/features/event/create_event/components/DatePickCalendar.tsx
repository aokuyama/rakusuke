import { FC } from "react";
import { Calendar } from "./Calendar";
import { Date } from "domain/src/model/date";

interface Props {
  dateList: Date[];
  range: {
    min: Date;
    max: Date;
  };
  setDateHandler: (d: Date) => void;
}

export const DatePickCalendar: FC<Props> = ({
  dateList,
  range,
  setDateHandler,
}) => {
  const onCalendarChange = (d: globalThis.Date) => {
    setDateHandler(Date.convert(d));
  };

  return (
    <Calendar dates={dateList} onChangeFunc={onCalendarChange} range={range} />
  );
};
