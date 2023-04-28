import "reflect-metadata";
import { container } from "../../registry";
import {
  CreateEventInteractor,
  CreateEventOutput,
} from "usecase/src/create_event";
import z from "zod";
import { publicProcedure } from "../";

export const createEvent = publicProcedure
  .input(z.object({ name: z.string(), dates: z.array(z.string()) }))
  .mutation(async (opts) => {
    const { input } = opts;
    let path: string | undefined;

    container.register("CreateEventPresenter", {
      useValue: {
        render: async (output: CreateEventOutput): Promise<void> => {
          path = output.path;
        },
      },
    });
    const createEvent = container.resolve(CreateEventInteractor);
    await createEvent.handle({ name: input.name, dates: input.dates });

    return { path: path };
  });
