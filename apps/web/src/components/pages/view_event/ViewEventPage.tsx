import { FC, useState } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { storage } from "@/registry";
import { Loading } from "ui/src/components/Loading";
import { Event } from "@/components/pages/view_event/Event";
import { Dev } from "@/features/dev/components/Dev";
import { OverviewRecentEvent } from "@/features/event/recently_viewed_events/components/OverviewRecentEvent";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";

interface Props {
  event: CurrentEvent | null | undefined;
  setEvent: (event: CurrentEvent | null) => void;
  events: RecentlyViewedEvent;
}

export const ViewEventPage: FC<Props> = ({ event, setEvent, events }) => {
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);
  const user = storage.getUser();

  return (
    <>
      <OverviewRecentEvent events={events} />
      <Loading isLoading={event === undefined}>
        <Event
          event={event}
          setEvent={setEvent}
          targetGuest={targetGuest}
          setTargetGuest={setTargetGuest}
        />
      </Loading>
      <Dev user={user} />
    </>
  );
};
