import { FC } from "react";
import { CountList } from "ui/src/components/CountList";
import { CountListItem } from "ui/src/components/CountListItem";
import { Schedule } from "../types/schedule";

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
            name={item.date.short()}
            length={item.length}
            strong={item.strong}
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
