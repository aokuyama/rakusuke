import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { FC } from "react";
import { SideTitle } from "ui/src/components/SideTitle";
import { OverviewRecentEventBody } from "./OverviewRecentEventBody";
import { CurrentEventView } from "domain/src/model/event";

interface Props {
  events: RecentlyViewedEvent | undefined;
  currentEvent: CurrentEventView | undefined;
}

export const OverviewRecentEvent: FC<Props> = ({ events, currentEvent }) => {
  return (
    <>
      {events && (
        <>
          <SideTitle>最近見たイベント</SideTitle>
          <div>
            <OverviewRecentEventBody
              events={events}
              currentEvent={currentEvent}
            />
          </div>
        </>
      )}
    </>
  );
};
