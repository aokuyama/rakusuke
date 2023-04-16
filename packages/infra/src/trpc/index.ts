import { initTRPC } from "@trpc/server";

import z from "zod";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that cane be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  eventCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;

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

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
