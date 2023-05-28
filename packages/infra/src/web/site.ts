import { EventPath } from "domain/src/model/event";

const eventPath = "e";
const eventQueryKey = "p";
const BOTS = [
  "Twitterbot",
  "facebookexternalhit",
  "line-poker",
  "Discordbot",
  "SkypeUriPreview",
  "Slackbot-LinkExpanding",
  "PlurkBot",
];

export const Site = {
  eventPath: "e",
  eventQueryKey: "p",
  isEventPagePath: (path: string): boolean => {
    return path === `/${eventPath}/`;
  },

  parseEventPathQuery: (querystring: string): string | null => {
    if (!querystring.startsWith(eventQueryKey + "=")) {
      return null;
    }
    const q = querystring.substring(2);
    if (q.length != EventPath.LENGTH) {
      return null;
    }
    return q;
  },

  isBot: (userAgent: string): boolean => {
    return BOTS.some((v) => {
      return userAgent.includes(v);
    });
  },
};
