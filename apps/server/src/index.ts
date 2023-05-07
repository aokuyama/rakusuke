import { container } from "./registry";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "infra/src/trpc";
import cors from "cors";

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const server = createHTTPServer({
  middleware: cors(options),
  router: appRouter,
});
container;
server.listen(3001);
