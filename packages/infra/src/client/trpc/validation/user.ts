import z from "zod";

export const userSchema = z.object({
  uuid: z.string(),
  token: z.string(),
});
