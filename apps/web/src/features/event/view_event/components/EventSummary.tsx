import { FC } from "react";
import { CountList } from "ui/src/components/CountList";
import { CountListItem } from "ui/src/components/CountListItem";
import { CurrentEvent } from "domain/src/model/event";

type Props = {
  event: CurrentEvent;
  focusId: string | undefined;
  setFocus: (id: string | undefined) => void;
};

export const EventSummary: FC<Props> = ({ event, focusId, setFocus }) => {
  const { dates } = event.scheduleDateMap();

  return (
    <CountList>
      {dates.map((item, index) => {
        const focusHandler = item.attendees.length
          ? () => setFocus(item.id)
          : undefined;
        const unfocusHandler = item.attendees.length
          ? () => setFocus(undefined)
          : undefined;
        return (
          <CountListItem
            key={index}
            name={item.date.short()}
            length={item.attendees.length}
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
