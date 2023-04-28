export * from "./trpc";
import { appRouter as eventRouter } from "./router";
import { router } from "./trpc";

export const appRouter = router({
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
