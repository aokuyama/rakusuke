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
  name: "らくスケ",
  slogan: "この世界で最もラクな日程調整アプリ",
  eventPlaceholder: "（例:お花見会）",

  getEventPageTitle: (
    event: { name: string; description: string } | null | undefined
  ): string => {
    if (event) {
      return event.name + " はいつがいいですか？ by " + Site.name;
    }
    return Site.name;
  },
  getEventPageDescription: (
    event: { name: string; description: string } | null
  ): string => {
    if (event) {
      if (event.description.length > 0) {
        return event.description;
      }
      return Site.slogan;
    }
    return "イベントが見つかりません";
  },
  getEventPagePath: (path: string): string => {
    return Site.eventPagePath() + path;
  },
  eventPagePath: (): string => {
    return `/${eventPath}/`;
  },
  addEventPathQuery: (qs: string, eventPath: string): string => {
    const params = queryString.parse(qs);
    params[eventQueryKey] = eventPath;
    return queryString.stringify(params);
  },

  isEventPagePath: (path: string): boolean => {
    return path === Site.eventPagePath();
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
