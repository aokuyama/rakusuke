import { useEffect, useState } from "react";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { CurrentEvent } from "domain/src/model/event";
import { storage } from "@/registry";

export const useEvents = (): {
  events: RecentlyViewedEvent | undefined;
  setEvents: (event: CurrentEvent) => void;
} => {
  const [events, setEventsBase] = useState<RecentlyViewedEvent | undefined>(
    undefined
  );
  const setEvents = (event: CurrentEvent) => {
    if (!events) {
      return;
    }
    const newEvents = events.push(event);
    setEventsBase(newEvents);
    storage.saveRecentEvents(newEvents);
  };
  useEffect(() => {
    setEventsBase(storage.getRecentEvents);
  }, []);

  return { events, setEvents };
};
