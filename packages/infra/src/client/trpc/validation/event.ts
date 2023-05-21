import z from "zod";

export const eventCreateSchema = z.object({
  name: z.string().min(1).max(20),
  schedule: z.array(z.object({ date: z.string() })).min(1),
});

export const userSchema = z.object({
  uuid: z.string(),
  token: z.string(),
});
