import { GuestName, GuestNumber } from "domain/src/model/guest";
import { GuestMemo } from "domain/src/model/guest/memo";
import z from "zod";

export const guestCreateSchema = z.object({
  name: z.string().min(GuestName.MIN).max(GuestName.MAX),
  memo: z.string().max(GuestMemo.MAX),
  attendance: z.array(z.object({ date: z.string(), attend: z.boolean() })),
});

export const guestUpdateSchema = z.object({
  number: z.number().min(GuestNumber.MIN),
  name: z.string().min(GuestName.MIN).max(GuestName.MAX),
  memo: z.string().max(GuestMemo.MAX),
  attendance: z.array(z.object({ date: z.string(), attend: z.boolean() })),
});
