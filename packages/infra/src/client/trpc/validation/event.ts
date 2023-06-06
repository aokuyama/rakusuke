import { EventDates } from "domain/src/model/event/date_list";
import { EventName } from "domain/src/model/event/name";
import { EventPath } from "domain/src/model/event/path";
import z from "zod";

export const eventCreateSchema = z.object({
  name: z.string().min(EventName.MIN).max(EventName.MAX),
  schedule: z
    .array(z.object({ date: z.string() }))
    .min(EventDates.MIN)
    .max(EventDates.MAX),
});

export const eventUpdateSchema = z.object({
  path: z.string().length(EventPath.LENGTH),
  name: z.string().min(EventName.MIN).max(EventName.MAX),
  schedule: z
    .array(z.object({ date: z.string() }))
    .min(EventDates.MIN)
    .max(EventDates.MAX),
});

export const decideOnEventDateSchema = z.object({
  path: z.string().length(EventPath.LENGTH),
  date: z.string(),
});
