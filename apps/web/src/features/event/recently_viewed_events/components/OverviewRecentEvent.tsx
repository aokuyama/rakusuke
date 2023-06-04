import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { FC } from "react";
import { SideTitle } from "ui/src/components/SideTitle";
import { OverviewRecentEventBody } from "./OverviewRecentEventBody";
import { CurrentEvent } from "domain/src/model/event";

interface Props {
  events: RecentlyViewedEvent | undefined;
  currentEvent: CurrentEvent | null | undefined;
}

export const OverviewRecentEvent: FC<Props> = ({ events, currentEvent }) => {
  return (
    <>
      <SideTitle>最近見たイベント</SideTitle>
      <div>
        {events && (currentEvent || currentEvent === null) && (
          <OverviewRecentEventBody
            events={events}
            currentEvent={currentEvent}
          />
        )}
      </div>
    </>
  );
};
