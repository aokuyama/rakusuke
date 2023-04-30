import "reflect-metadata";
import { container } from "../../registry";
import {
  GetEventByPathInteractor,
  GetEventByPathOutput,
} from "usecase/src/get_event_by_path";
import { UpcomingEvent } from "domain/src/model/event";
import z from "zod";
import { publicProcedure } from "../";

export const getEventByPath = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    const { input } = opts;
    let e: UpcomingEvent | null | undefined;

    container.register("GetEventByPathPresenter", {
      useValue: {
        render: async (output: GetEventByPathOutput): Promise<void> => {
          e = output.event;
        },
      },
    });
    const GetEventByPath = container.resolve(GetEventByPathInteractor);
    await GetEventByPath.handle({ path: input });

    return { event: e?.serialize() };
  });
