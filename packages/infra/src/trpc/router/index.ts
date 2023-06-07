import { router } from "../";
import { createEvent } from "./create_event";
import { getEventByPath } from "./get_event_by_path";
import { respondAttendance } from "./respond_attendance";
import { updateAttendance } from "./update_attendance";
import { updateEvent } from "./update_event";
import { decideOnEventDate } from "./decide_on_event_date";
import { drawingEventDate } from "./drawing_event_date";

export const appRouter = router({
  createEvent: createEvent,
  getEventByPath: getEventByPath,
  respondAttendance: respondAttendance,
  updateAttendance: updateAttendance,
  updateEvent: updateEvent,
  decideOnEventDate: decideOnEventDate,
  drawingEventDate: drawingEventDate,
});
