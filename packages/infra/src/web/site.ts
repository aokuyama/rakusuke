import queryString from "query-string-esm";

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
  isEventPagePath: (path: string): boolean => {
    return path === `/${eventPath}/`;
  },

  parseEventPathByQuery: (query: string): string | null => {
    return Site.parseEventPathByQueryArray(queryString.parse(query));
  },

  parseEventPathByQueryArray: (
    queryArray: queryString.ParsedQuery<string>
  ): string | null => {
    const q = queryArray[eventQueryKey];
    return q ? (Array.isArray(q) ? q[0] : q) : null;
  },

  isBot: (userAgent: string): boolean => {
    return BOTS.some((v) => {
      return userAgent.includes(v);
    });
  },

  parseEventPathByPath: (path: string): string | null => {
    if (!path.startsWith(`/${eventPath}/`)) {
      return null;
    }
    const e = path.split("/");
    if (e[3] && e[3].length) {
      return null;
    }
    return e[2].length ? e[2] : null;
  },
};
