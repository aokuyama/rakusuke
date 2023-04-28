import { router } from "../";
import { createEvent } from "./create_event";
import { getEventByPath } from "./get_event_by_path";

export const appRouter = router({
  createEvent: createEvent,
  getEventByPath: getEventByPath,
});
