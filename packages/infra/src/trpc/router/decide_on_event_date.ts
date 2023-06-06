import "reflect-metadata";
import { container } from "../../registry";
import {
  DecideOnEventDateInteractor,
  DecideOnEventDateOutput,
} from "usecase/src/decide_on_event_date";
import { GetUserInteractor, GetUserOutput } from "usecase/src/get_user";
import z from "zod";
import { publicProcedure } from "../";
import { ExistingEvent, CurrentEventArgs } from "domain/src/model/event";
import { TRPCError } from "@trpc/server";
import { UserEntity } from "domain/src/model/user";
import { decideOnEventDateSchema } from "../../client/trpc/validation/event";
import { userSchema } from "../../client/trpc/validation/user";

export const decideOnEventDate = publicProcedure
  .input(
    z.object({
      user: userSchema,
      event: decideOnEventDateSchema,
    })
  )
  .mutation(async (opts): Promise<{ event: CurrentEventArgs | null }> => {
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

    container.register("DecideOnEventDatePresenter", {
      useValue: {
        render: async (output: DecideOnEventDateOutput): Promise<void> => {
          event = output.event;
        },
      },
    });
    const decideOnEventDate = container.resolve(DecideOnEventDateInteractor);
    await decideOnEventDate.handle({
      userId: user.id,
      path: input.event.path,
      date: input.event.date,
    });

    if (!event) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return { event: event.toFront(user._id).serialize() };
  });
