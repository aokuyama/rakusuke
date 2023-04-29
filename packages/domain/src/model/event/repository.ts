import { NewEvent } from ".";
import { UpcomingEvent } from ".";
import { EventPath } from "./path";

export interface EventRepository {
  createEvent: (event: NewEvent) => Promise<string>;
  loadEventByPath: (path: EventPath) => Promise<UpcomingEvent | null>;
}
