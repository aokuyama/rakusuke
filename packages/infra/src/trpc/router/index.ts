import { router } from "../";
import { createEvent } from "./create_event";
import { getEventByPath } from "./get_event_by_path";
import { respondAttendance } from "./respond_attendance";
import { updateAttendance } from "./update_attendance";
import { updateEvent } from "./update_event";

export const appRouter = router({
  createEvent: createEvent,
  getEventByPath: getEventByPath,
  respondAttendance: respondAttendance,
  updateAttendance: updateAttendance,
  updateEvent: updateEvent,
});
