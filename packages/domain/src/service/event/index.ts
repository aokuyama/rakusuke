import { Date } from "../../model/event/date";

const MAX = 45;
export const eventMaxDate = (date: Date): Date => date.addDays(MAX);
export const validateMaxDate = (schedule: Date[], start: Date): boolean => {
  const max = eventMaxDate(start);
  for (const date of schedule) {
    if (max.isAfter(date)) {
      return false;
    }
  }
  return true;
};
