import { initTRPC } from "@trpc/server";
import { createEvent } from "../registry/create_event";
import z from "zod";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  createEvent: publicProcedure
    .input(z.object({ name: z.string(), dates: z.array(z.string()) }))
    .mutation(async (opts) => {
      const { input } = opts;
      await createEvent.handle({ name: input.name, dates: input.dates });

      //     const input: {
      //     name: string;
      //  };
      // Create a new user in the database
      // const user = await db.user.create(input);
      //   const event: {
      //   name: string;
      //};
      return {};
    }),
  eventById: publicProcedure.input(z.string()).query(async (opts) => {
    //   const { input } = opts;

    return {};
  }),
});

export type AppRouter = typeof appRouter;
