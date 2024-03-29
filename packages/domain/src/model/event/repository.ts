import { NewEvent, ExistingEvent, UpdateEvent } from ".";
import { EventPath } from "./path";

export interface EventRepository {
  createEvent: (event: NewEvent) => Promise<ExistingEvent>;
  loadEventByPath: (path: EventPath) => Promise<ExistingEvent | null>;
  updateEvent: (
    before: ExistingEvent,
    after: UpdateEvent,
  ) => Promise<ExistingEvent>;
}
