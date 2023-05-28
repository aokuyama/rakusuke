import { handler } from "./lambda";

const event = {
  Records: [
    {
      cf: {
        request: {
          headers: {
            "user-agent": [
              {
                key: "User-Agent",
                value: "Slackbot-LinkExpanding",
              },
            ],
          },
          uri: "/e/",
          querystring: "p=1234567890abcdef",
        },
      },
    },
  ],
};

const r = await handler(event);
console.log(r);
