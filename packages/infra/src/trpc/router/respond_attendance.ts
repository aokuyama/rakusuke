import "reflect-metadata";
import { container } from "../../registry";
import {
  RespondAttendanceInteractor,
  RespondAttendanceOutput,
} from "usecase/src/respond_attendance";
import z from "zod";
import { publicProcedure } from "../";

export const respondAttendance = publicProcedure
  .input(
    z.object({
      event: z.string(),
      name: z.string(),
      attendance: z.array(z.object({ date: z.string(), attend: z.boolean() })),
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
      name: input.name,
      attendance: input.attendance,
    });

    return {
      guest: guest,
    };
  });
