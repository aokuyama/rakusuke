import "reflect-metadata";
import { container } from "../../registry";
import {
  GetOrCreateUserInteractor,
  GetOrCreateUserOutput,
} from "usecase/src/get_or_create_user";
import z from "zod";
import { publicProcedure } from "../";
import { User } from "domain/src/model/user";
import { TRPCError } from "@trpc/server";

export const getOrCreateUser = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    const { input } = opts;
    let user: User | null | undefined;

    container.register("GetOrCreateUserPresenter", {
      useValue: {
        render: async (output: GetOrCreateUserOutput): Promise<void> => {
          user = output.user;
        },
      },
    });
    const GetOrCreateUser = container.resolve(GetOrCreateUserInteractor);
    await GetOrCreateUser.handle({ token: input });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return { token: user.getRawToken() };
  });
