import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { appRouter } from "infra/src/trpc";
import { container } from "./registry";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
