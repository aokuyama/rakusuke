import "reflect-metadata";
import { container } from "../../registry";
import {
  UpdateEventInteractor,
  UpdateEventOutput,
} from "usecase/src/update_event";
import z from "zod";
import { publicProcedure } from "../";
import { UpcomingEvent } from "domain/src/model/event";

export const updateEvent = publicProcedure
  .input(
    z.object({ path: z.string(), name: z.string(), dates: z.array(z.string()) })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    let event: UpcomingEvent | undefined;

    container.register("UpdateEventPresenter", {
      useValue: {
        render: async (output: UpdateEventOutput): Promise<void> => {
          event = output.event;
        },
      },
    });
    const createEvent = container.resolve(UpdateEventInteractor);
    await createEvent.handle({
      path: input.path,
      name: input.name,
      dates: input.dates,
    });

    return { event: event?.serialize() };
  });
