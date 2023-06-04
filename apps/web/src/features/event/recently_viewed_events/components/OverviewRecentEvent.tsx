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
      {events && (currentEvent || currentEvent === null) && (
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
