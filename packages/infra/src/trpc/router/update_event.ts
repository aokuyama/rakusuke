import "reflect-metadata";
import { container } from "../../registry";
import {
  UpdateEventInteractor,
  UpdateEventOutput,
} from "usecase/src/update_event";
import { GetUserInteractor, GetUserOutput } from "usecase/src/get_user";
import z from "zod";
import { publicProcedure } from "../";
import { ExistingEvent, UpcomingEventArgs } from "domain/src/model/event";
import { TRPCError } from "@trpc/server";
import { UserEntity } from "domain/src/model/user";
import { eventUpdateSchema } from "../../client/trpc/validation/event";
import { userSchema } from "../../client/trpc/validation/user";

export const updateEvent = publicProcedure
  .input(
    z.object({
      user: userSchema,
      event: eventUpdateSchema,
    })
  )
  .mutation(async (opts): Promise<{ event: UpcomingEventArgs | null }> => {
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
    await getUser.handle({ uuid: input.user.uuid, token: input.user.token });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    let event: ExistingEvent | undefined;

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
      path: input.event.path,
      name: input.event.name,
      dates: input.event.schedule.map((s) => s.date),
    });

    if (!event) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return { event: event.toFront(user._id).serialize() };
  });
