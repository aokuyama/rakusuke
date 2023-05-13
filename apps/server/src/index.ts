import { container } from "./registry";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "infra/src/trpc";
import cors from "cors";

if (!process.env.URL_APP) {
  throw new Error("undefined URL_APP");
}

const allowedOrigins = [process.env.URL_APP];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const server = createHTTPServer({
  middleware: cors(options),
  router: appRouter,
});
container;
server.listen(3001);
