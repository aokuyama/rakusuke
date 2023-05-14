import type { AppRouter } from "../../trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_URL_API || "/api",
    }),
  ],
});
