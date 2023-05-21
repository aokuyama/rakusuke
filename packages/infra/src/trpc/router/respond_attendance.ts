import "reflect-metadata";
import { container } from "../../registry";
import {
  RespondAttendanceInteractor,
  RespondAttendanceOutput,
} from "usecase/src/respond_attendance";
import z from "zod";
import { publicProcedure } from "../";
import { guestCreateSchema } from "../../client/trpc/validation/guest";

export const respondAttendance = publicProcedure
  .input(
    z.object({
      event: z.string(),
      guest: guestCreateSchema,
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    let guest: RespondAttendanceOutput | undefined;

    container.register("RespondAttendancePresenter", {
      useValue: {
        render: async (output: RespondAttendanceOutput): Promise<void> => {
          guest = output;
        },
      },
    });
    const RespondAttendance = container.resolve(RespondAttendanceInteractor);
    await RespondAttendance.handle({
      eventPath: input.event,
      name: input.guest.name,
      attendance: input.guest.attendance,
    });

    return {
      guest: guest,
    };
  });
