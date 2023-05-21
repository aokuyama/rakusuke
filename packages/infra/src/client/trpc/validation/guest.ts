import z from "zod";

export const guestCreateSchema = z.object({
  name: z.string().min(1).max(20),
  attendance: z.array(z.object({ date: z.string(), attend: z.boolean() })),
});

export const guestUpdateSchema = z.object({
  number: z.number(),
  name: z.string().min(1).max(20),
  attendance: z.array(z.object({ date: z.string(), attend: z.boolean() })),
});
