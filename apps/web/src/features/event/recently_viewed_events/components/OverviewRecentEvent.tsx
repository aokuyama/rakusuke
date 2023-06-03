import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { Event } from "./Event";
import { FC } from "react";

interface Props {
  events: RecentlyViewedEvent;
}

export const OverviewRecentEvent: FC<Props> = ({ events }) => {
  return (
    <ul>
      {events.map((event, i) => {
        return (
          <li key={i}>
            <Event event={event} />
          </li>
        );
      })}
    </ul>
  );
};
