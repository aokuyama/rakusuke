import { Date } from "../../model/event/date";
import { notNull } from "../../util";

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

export const drawingEventDate = (
  schedule: { date: string; enable: boolean }[]
): string => {
  const enables = schedule
    .map((s) => (s.enable ? s.date : null))
    .filter(notNull);

  return enables[Math.floor(Math.random() * enables.length)];
};
