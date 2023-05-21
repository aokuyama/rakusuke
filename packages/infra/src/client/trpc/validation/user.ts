import { UserToken } from "domain/src/model/user";
import z from "zod";

export const userSchema = z.object({
  uuid: z.string(),
  token: z.string().length(UserToken.LENGTH),
});
