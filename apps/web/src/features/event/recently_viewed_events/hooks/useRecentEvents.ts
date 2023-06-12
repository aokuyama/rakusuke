import { useEffect, useState } from "react";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { CurrentEvent } from "domain/src/model/event";
import { storage } from "@/registry";

export const useRecentEvents = (): {
  events: RecentlyViewedEvent | undefined;
  setEvents: (event: CurrentEvent) => void;
} => {
  const [events, setEventsBase] = useState<RecentlyViewedEvent>();
  const [eventsTmp, setEventsTmp] = useState<RecentlyViewedEvent>(
    RecentlyViewedEvent.createEmpty()
  );

  const setEvents = (event: CurrentEvent) => {
    setEventsTmp(eventsTmp.push(event));
  };

  useEffect(() => {
    setEventsBase(storage.getRecentEvents());
  }, []);

  useEffect(() => {
    if (!events) {
      return;
    }
    if (!eventsTmp.length()) {
      return;
    }
    const newEvents = events.pushEvents(eventsTmp);
    setEventsBase(newEvents);
    storage.saveRecentEvents(newEvents);
    setEventsTmp(RecentlyViewedEvent.createEmpty());
  }, [events, eventsTmp]);

  return { events, setEvents };
};
