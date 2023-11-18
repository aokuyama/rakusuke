import "reflect-metadata";
import { container } from "../../registry";
import {
  UpdateAttendanceInteractor,
  UpdateAttendanceOutput,
} from "usecase/src/update_attendance";
import z from "zod";
import { publicProcedure } from "../";
import { guestUpdateSchema } from "../../client/trpc/validation/guest";
import { EventGuest } from "domain/src/model/guest";
import { TRPCError } from "@trpc/server";

export const updateAttendance = publicProcedure
  .input(
    z.object({
      event: z.string(),
      guest: guestUpdateSchema,
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    let guest: EventGuest | undefined;

    container.register("UpdateAttendancePresenter", {
      useValue: {
        render: async (output: UpdateAttendanceOutput): Promise<void> => {
          guest = output.guest;
        },
      },
    });
    const UpdateAttendance = container.resolve(UpdateAttendanceInteractor);
    await UpdateAttendance.handle({
      eventPath: input.event,
      number: input.guest.number,
      name: input.guest.name,
      memo: input.guest.memo,
      attendance: input.guest.attendance,
    });

    if (!guest) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return {
      guest: guest.serialize(),
    };
  });
