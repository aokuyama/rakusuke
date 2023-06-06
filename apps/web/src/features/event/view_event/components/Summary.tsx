import { FC } from "react";
import { CountList } from "ui/src/components/CountList";
import { CountListItem } from "ui/src/components/CountListItem";

export type Schedule = {
  id: string;
  date: string;
  length: number;
  selected: boolean;
};

type Props = {
  summary: Schedule[];
  focusId: string | undefined;
  setFocus: (id: string | undefined) => void;
};

export const Summary: FC<Props> = ({ summary, focusId, setFocus }) => {
  return (
    <CountList>
      {summary.map((item, index) => {
        const focusHandler = item.length ? () => setFocus(item.id) : undefined;
        const unfocusHandler = item.length
          ? () => setFocus(undefined)
          : undefined;
        return (
          <CountListItem
            key={index}
            name={item.date}
            length={item.length}
            focused={item.id === focusId}
            selected={item.selected}
            focusHandler={focusHandler}
            unfocusHandler={unfocusHandler}
          />
        );
      })}
    </CountList>
  );
};
