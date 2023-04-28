import { NewEvent } from ".";
import { Event } from ".";

export interface EventRepository {
  createEvent: (event: NewEvent) => Promise<string>;
  getEventByPath: (path: string) => Promise<Event | null>;
}
