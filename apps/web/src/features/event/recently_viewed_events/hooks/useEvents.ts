import { useCallback, useEffect, useState } from "react";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { CurrentEvent } from "domain/src/model/event";
import { storage } from "@/registry";

export const useEvents = (): {
  events: RecentlyViewedEvent | undefined;
  setEvents: (event: CurrentEvent) => void;
} => {
  const [events, setEventsBase] = useState<RecentlyViewedEvent>();
  const [eventsTmp, setEventsTmp] = useState<RecentlyViewedEvent>(
    RecentlyViewedEvent.createEmpty()
  );

  const setEvents = useCallback(
    (event: CurrentEvent) => {
      const newEvents = eventsTmp.push(event);
      setEventsTmp(newEvents);
    },
    [eventsTmp]
  );

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
    setEventsBase(events.pushEvents(eventsTmp));
    setEventsTmp(RecentlyViewedEvent.createEmpty());
    storage.saveRecentEvents(events);
  }, [events, eventsTmp]);

  return { events, setEvents };
};
