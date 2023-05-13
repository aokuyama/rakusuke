import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { appRouter } from "infra/src/trpc";
import { container } from "./registry";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  responseMeta() {
    if (!process.env.URL_APP) {
      throw new Error("undefined URL_APP");
    }
    return {
      headers: {
        "Access-Control-Allow-Origin": process.env.URL_APP,
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Max-Age": "300",
      },
    };
  },
});
