import { FC, useState } from "react";
import { CurrentEvent, CurrentEventView } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { OverviewRecentEvent } from "@/features/event/recently_viewed_events/components/OverviewRecentEvent";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { Main } from "ui/src/components/layout/Main";
import { Frame } from "ui/src/components/layout/Frame";
import {
  SectionLeft,
  SectionMain,
  SectionRight,
} from "ui/src/components/layout/Section";
import { EventLoading } from "@/features/event/view_event/components/EventLoading";
import { EventNotFound } from "@/features/event/view_event/components/EventNotFound";
import { EventFound } from "@/features/event/view_event/components/EventFound";
import { GuestView } from "@/features/guest/view_guest/components/GuestView";

interface Props {
  event: CurrentEventView;
  setEvent: (event: CurrentEvent) => void;
  events: RecentlyViewedEvent | undefined;
}

export const ViewEventPage: FC<Props> = ({ event, setEvent, events }) => {
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);

  return (
    <Frame>
      <Main>
        <SectionMain>
          {event.isExist() && <EventFound event={event} setEvent={setEvent} />}
          {event.isNotFound() && <EventNotFound />}
          {event.isLoading() && <EventLoading />}
        </SectionMain>
        <SectionLeft>
          {event.isExist() && (
            <GuestView
              event={event}
              setEvent={setEvent}
              targetGuest={targetGuest}
              setTargetGuest={setTargetGuest}
            />
          )}
        </SectionLeft>
        <SectionRight>
          <OverviewRecentEvent events={events} currentEvent={event} />
        </SectionRight>
      </Main>
    </Frame>
  );
};
