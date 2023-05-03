import "reflect-metadata";
import { container } from "../../registry";
import {
  UpdateAttendanceInteractor,
  UpdateAttendanceOutput,
} from "usecase/src/update_attendance";
import z from "zod";
import { publicProcedure } from "../";

export const updateAttendance = publicProcedure
  .input(
    z.object({
      event: z.string(),
      number: z.number(),
      name: z.string(),
      attendance: z.array(z.object({ date: z.string(), attend: z.boolean() })),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    let guest: UpdateAttendanceOutput | undefined;

    container.register("UpdateAttendancePresenter", {
      useValue: {
        render: async (output: UpdateAttendanceOutput): Promise<void> => {
          guest = output;
        },
      },
    });
    const UpdateAttendance = container.resolve(UpdateAttendanceInteractor);
    await UpdateAttendance.handle({
      eventPath: input.event,
      number: input.number,
      name: input.name,
      attendance: input.attendance,
    });

    return {
      guest: guest,
    };
  });
