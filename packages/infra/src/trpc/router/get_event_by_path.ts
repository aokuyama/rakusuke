import "reflect-metadata";
import { container } from "../../registry";
import {
  CreateEventInteractor,
  CreateEventOutput,
} from "usecase/src/create_event";
import { Event } from "domain/src/model/event/event";
import z from "zod";
import { publicProcedure } from "..";

export const getEventByPath = publicProcedure
  .input(z.string())
  .query(async (opts) => {
    //   const { input } = opts;

    return { event: {} };
  });
