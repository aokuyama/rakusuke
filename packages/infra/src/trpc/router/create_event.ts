import "reflect-metadata";
import { container } from "../../registry";
import {
  CreateEventInteractor,
  CreateEventOutput,
} from "usecase/src/create_event";
import {
  GetOrCreateUserInteractor,
  GetOrCreateUserOutput,
} from "usecase/src/get_or_create_user";
import z from "zod";
import { publicProcedure } from "../";
import { UserEntity } from "domain/src/model/user";
import { TRPCError } from "@trpc/server";

export const createEvent = publicProcedure
  .input(
    z.object({
      token: z.string().nullable(),
      name: z.string(),
      dates: z.array(z.string()),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;

    let user: UserEntity | null | undefined;

    container.register("GetOrCreateUserPresenter", {
      useValue: {
        render: async (output: GetOrCreateUserOutput): Promise<void> => {
          user = output.user;
        },
      },
    });
    const GetOrCreateUser = container.resolve(GetOrCreateUserInteractor);
    await GetOrCreateUser.handle({ token: input.token });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    let path: string | undefined;

    container.register("CreateEventPresenter", {
      useValue: {
        render: async (output: CreateEventOutput): Promise<void> => {
          path = output.path;
        },
      },
    });
    const createEvent = container.resolve(CreateEventInteractor);
    await createEvent.handle({
      organizerId: user.id,
      name: input.name,
      dates: input.dates,
    });

    return { path: path };
  });
