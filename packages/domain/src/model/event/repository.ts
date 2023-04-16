import { NewEvent } from "./event";

export interface EventRepository {
  createEvent: (event: NewEvent) => Promise<string>;
}
