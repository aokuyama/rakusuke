import { useState } from "react";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { CurrentEvent } from "domain/src/model/event";

export const useEvents = (): {
  events: RecentlyViewedEvent;
  setEvents: (event: CurrentEvent) => void;
} => {
  const [events, setEventsBase] = useState<RecentlyViewedEvent>(
    RecentlyViewedEvent.createEmpty()
  );
  const setEvents = (event: CurrentEvent) => {
    setEventsBase(events.push(event));
    return;
  };

  return { events, setEvents };
};
