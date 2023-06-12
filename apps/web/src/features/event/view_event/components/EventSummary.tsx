import { FC } from "react";
import { CountList } from "ui/src/components/CountList";
import { CountListItem } from "ui/src/components/CountListItem";
import { CurrentEvent } from "domain/src/model/event";
import { EventDate } from "../../decide_on_event_date/types";

type Props = {
  event: CurrentEvent;
  focus: EventDate | undefined;
  setFocus: (day: EventDate | undefined) => void;
};

export const EventSummary: FC<Props> = ({ event, focus, setFocus }) => {
  const { dates } = event.scheduleDateMap();

  return (
    <CountList>
      {dates.map((item, index) => {
        const focusHandler = item.attendees.length
          ? () => setFocus(item)
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
            focused={focus ? item.id === focus.id : false}
            selected={item.selected}
            focusHandler={focusHandler}
            unfocusHandler={unfocusHandler}
          />
        );
      })}
    </CountList>
  );
};
