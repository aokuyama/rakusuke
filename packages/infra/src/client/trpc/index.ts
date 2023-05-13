import type { AppRouter } from "../../trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

if (!process.env.NEXT_PUBLIC_URL_API) {
  throw new Error("undefined NEXT_PUBLIC_URL_API");
}

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_URL_API,
    }),
  ],
});
