import "reflect-metadata";
import { container } from "../../registry";
import {
  UpdateAttendanceInteractor,
  UpdateAttendanceOutput,
} from "usecase/src/update_attendance";
import z from "zod";
import { publicProcedure } from "../";
import { guestUpdateSchema } from "../../client/trpc/validation/guest";

export const updateAttendance = publicProcedure
  .input(
    z.object({
      event: z.string(),
      guest: guestUpdateSchema,
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
      number: input.guest.number,
      name: input.guest.name,
      attendance: input.guest.attendance,
    });

    return {
      guest: guest,
    };
  });
