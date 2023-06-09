import { FC } from "react";
import { List } from "ui/src/components/List";
import { Date } from "domain/src/model/event/date";

interface Props {
  dateList: Date[];
}

export const PickedDates: FC<Props> = ({ dateList }) => {
  const items = dateList.map((d, i) => {
    return { id: i, name: d.toString() };
  });

  return (
    <>
      <List items={items} />
    </>
  );
};
