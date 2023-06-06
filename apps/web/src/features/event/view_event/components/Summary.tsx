import { FC } from "react";
import { CountList } from "ui/src/components/CountList";
import { CountListItem } from "ui/src/components/CountListItem";

export type Item = { id: string; name: string; length: number };

type Props = {
  summary: Item[];
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
            name={item.name}
            key={index}
            length={item.length}
            focusHandler={focusHandler}
            unfocusHandler={unfocusHandler}
            focused={item.id === focusId}
          />
        );
      })}
    </CountList>
  );
};
