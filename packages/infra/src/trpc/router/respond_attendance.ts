import "reflect-metadata";
import { container } from "../../registry";
import {
  RespondAttendanceInteractor,
  RespondAttendanceOutput,
} from "usecase/src/respond_attendance";
import z from "zod";
import { publicProcedure } from "../";
import { guestCreateSchema } from "../../client/trpc/validation/guest";
import { EventGuest } from "domain/src/model/guest";
import { TRPCError } from "@trpc/server";

export const respondAttendance = publicProcedure
  .input(
    z.object({
      event: z.string(),
      guest: guestCreateSchema,
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    let guest: EventGuest | undefined;

    container.register("RespondAttendancePresenter", {
      useValue: {
        render: async (output: RespondAttendanceOutput): Promise<void> => {
          guest = output.guest;
        },
      },
    });
    const RespondAttendance = container.resolve(RespondAttendanceInteractor);
    await RespondAttendance.handle({
      eventPath: input.event,
      name: input.guest.name,
      memo: input.guest.memo,
      attendance: input.guest.attendance,
    });

    if (!guest) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return {
      guest: guest.serialize(),
    };
  });
