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
import { eventCreateSchema } from "../../client/trpc/validation/event";
import { userSchema } from "../../client/trpc/validation/user";

export const createEvent = publicProcedure
  .input(
    z.object({
      user: userSchema.nullable(),
      event: eventCreateSchema,
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
    const getOrCreateUser = container.resolve(GetOrCreateUserInteractor);
    await getOrCreateUser.handle({
      user: input.user
        ? { uuid: input.user.uuid, token: input.user.token }
        : null,
    });
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
      name: input.event.name,
      dates: input.event.schedule.map((s) => s.date),
    });

    if (!path) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return { path: path, user: { uuid: user.uuid, token: user.getRawToken() } };
  });
