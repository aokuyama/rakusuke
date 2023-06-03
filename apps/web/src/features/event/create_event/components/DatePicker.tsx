import { FC } from "react";
import { Calendar } from "./Calendar";
import { List } from "ui/src/components/List";
import { Date } from "domain/src/model/event/date";

interface Props {
  dateList: Date[];
  range: {
    min: Date;
    max: Date;
  };
  setDateHandler: (d: Date) => void;
}

export const DatePicker: FC<Props> = ({ dateList, range, setDateHandler }) => {
  const items = dateList.map((d, i) => {
    return { id: i, name: d.toString() };
  });

  const onCalendarChange = (d: globalThis.Date) => {
    setDateHandler(Date.convert(d));
  };

  return (
    <>
      <Calendar
        dates={dateList}
        onChangeFunc={onCalendarChange}
        range={range}
      />
      <List items={items} />
    </>
  );
};
