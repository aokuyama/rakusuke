import { NewEvent } from ".";
import { UpcomingEvent } from ".";

export interface EventRepository {
  createEvent: (event: NewEvent) => Promise<string>;
  loadEventByPath: (path: string) => Promise<UpcomingEvent | null>;
}
