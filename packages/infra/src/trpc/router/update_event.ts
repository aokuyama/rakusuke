import "reflect-metadata";
import { container } from "../../registry";
import {
  UpdateEventInteractor,
  UpdateEventOutput,
} from "usecase/src/update_event";
import { GetUserInteractor, GetUserOutput } from "usecase/src/get_user";
import z from "zod";
import { publicProcedure } from "../";
import { UpcomingEvent } from "domain/src/model/event";
import { TRPCError } from "@trpc/server";
import { UserEntity } from "domain/src/model/user";

export const updateEvent = publicProcedure
  .input(
    z.object({
      token: z.string(),
      path: z.string(),
      name: z.string(),
      dates: z.array(z.string()),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    let user: UserEntity | null | undefined;

    container.register("GetUserPresenter", {
      useValue: {
        render: async (output: GetUserOutput): Promise<void> => {
          user = output.user;
        },
      },
    });
    const getUser = container.resolve(GetUserInteractor);
    await getUser.handle({ token: input.token });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    let event: UpcomingEvent | undefined;

    container.register("UpdateEventPresenter", {
      useValue: {
        render: async (output: UpdateEventOutput): Promise<void> => {
          event = output.event;
        },
      },
    });
    const updateEvent = container.resolve(UpdateEventInteractor);
    await updateEvent.handle({
      userId: user.id,
      path: input.path,
      name: input.name,
      dates: input.dates,
    });

    if (!event) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return { event: event.serialize() };
  });
