import { FC, useState } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { Loading } from "ui/src/components/Loading";
import { Event } from "@/components/pages/view_event/Event";
import { OverviewRecentEvent } from "@/features/event/recently_viewed_events/components/OverviewRecentEvent";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { Main } from "ui/src/components/layout/Main";
import { Aside } from "ui/src/components/layout/Aside";
import { Frame } from "ui/src/components/layout/Frame";

interface Props {
  event: CurrentEvent | null | undefined;
  setEvent: (event: CurrentEvent | null) => void;
  events: RecentlyViewedEvent;
}

export const ViewEventPage: FC<Props> = ({ event, setEvent, events }) => {
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);

  return (
    <Frame>
      <Main>
        <Loading isLoading={event === undefined}>
          <Event
            event={event}
            setEvent={setEvent}
            targetGuest={targetGuest}
            setTargetGuest={setTargetGuest}
          />
        </Loading>
      </Main>
      <Aside>
        <OverviewRecentEvent events={events} />
      </Aside>
    </Frame>
  );
};
