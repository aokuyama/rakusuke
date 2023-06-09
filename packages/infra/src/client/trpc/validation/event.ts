import { EventDates } from "domain/src/model/event/date_list";
import { EventDescription } from "domain/src/model/event/description";
import { EventName } from "domain/src/model/event/name";
import { EventPath } from "domain/src/model/event/path";
import z from "zod";

export const eventCreateSchema = z.object({
  name: z.string().min(EventName.MIN).max(EventName.MAX),
  description: z.string().max(EventDescription.MAX),
  schedule: z
    .array(z.object({ date: z.string() }))
    .min(EventDates.MIN)
    .max(EventDates.MAX),
});

export const eventUpdateSchema = z.object({
  path: z.string().length(EventPath.LENGTH),
  name: z.string().min(EventName.MIN).max(EventName.MAX),
  description: z.string().max(EventDescription.MAX),
  schedule: z
    .array(z.object({ date: z.string() }))
    .min(EventDates.MIN)
    .max(EventDates.MAX),
});

export const decideOnEventDateSchema = z.object({
  path: z.string().length(EventPath.LENGTH),
  date: z.string(),
});

const schedule = z
  .array(z.object({ date: z.string(), enable: z.boolean() }))
  .refine((v) => {
    let count = 0;
    for (const s of v) {
      if (s.enable) {
        count += 1;
      }
      if (count > 1) {
        return true;
      }
    }
    return false;
  }, "候補日は 2 つ以上選択してください");

export const drawingEventDateSchema = z.object({
  path: z.string().length(EventPath.LENGTH),
  schedule: schedule,
});
export const drawingSchema = z.object({
  schedule: schedule,
});
