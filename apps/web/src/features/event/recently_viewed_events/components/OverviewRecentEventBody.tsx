import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { Event } from "./Event";
import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { css } from "@emotion/react";

interface Props {
  events: RecentlyViewedEvent;
  currentEvent: CurrentEvent | null;
}

export const OverviewRecentEventBody: FC<Props> = ({
  events,
  currentEvent,
}) => {
  const ordered = events.order(currentEvent);
  if (!ordered.length()) {
    return (
      <p
        css={css`
          text-align: center;
        `}
      >
        表示できるイベントがありません
      </p>
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
