import "reflect-metadata";
import { container } from "../../registry";
import {
  GetEventByPathInteractor,
  GetEventByPathOutput,
} from "usecase/src/get_event_by_path";
import { ExistingEvent, CurrentEventArgs } from "domain/src/model/event";
import z from "zod";
import { publicProcedure } from "../";
import { UserEntity } from "domain/src/model/user";
import { TRPCError } from "@trpc/server";
import { GetUserOutput, GetUserInteractor } from "usecase/src/get_user";

export const getEventByPath = publicProcedure
  .input(
    z.object({
      user: z
        .object({
          uuid: z.string(),
          token: z.string(),
        })
        .nullable(),
      path: z.string(),
    }),
  )
  .query(async (opts): Promise<{ event: CurrentEventArgs | null }> => {
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
    if (input.user) {
      await getUser.handle({ uuid: input.user.uuid, token: input.user.token });
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    } else {
      user = null;
    }

    let event: ExistingEvent | null | undefined;

    container.register("GetEventByPathPresenter", {
      useValue: {
        render: async (output: GetEventByPathOutput): Promise<void> => {
          event = output.event;
        },
      },
    });
    const GetEventByPath = container.resolve(GetEventByPathInteractor);
    await GetEventByPath.handle({ path: input.path });

    return {
      event: event ? event.toFront(user ? user._id : null).serialize() : null,
    };
  });
