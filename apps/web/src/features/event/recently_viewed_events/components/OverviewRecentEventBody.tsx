import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { Event } from "./Event";
import { FC } from "react";
import { CurrentEventView } from "domain/src/model/event";
import { Message } from "ui/src/components/Message";

interface Props {
  events: RecentlyViewedEvent;
  currentEvent: CurrentEventView | undefined;
}

export const OverviewRecentEventBody: FC<Props> = ({
  events,
  currentEvent,
}) => {
  const ordered = events.order(currentEvent);
  if (!ordered.length()) {
    return (
      <Message type={"unavailable"}>表示できるイベントがありません</Message>
    );
  }
  return (
    <>
      {ordered.map((event, i) => {
        return <Event event={event} key={i} />;
      })}
    </>
  );
};
