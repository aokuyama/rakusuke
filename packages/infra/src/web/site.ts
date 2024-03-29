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
  message: {
    form: {
      event: {
        name: "イベントの名前を教えてください",
        calendar: "候補日を選択してください",
        description: "追加情報や参加者へのメッセージがあれば入力してください",
        drawing: "候補日を選択してください",
      },
      guest: {
        name: "あなたの名前を教えてください",
        calendar: "参加できる日を選択してください",
        memo: "メモや他の参加者へのメッセージなど自由に入力してください",
      },
      common: {
        error: "エラーが発生しました。しばらくしてからもう一度お試しください。",
      },
    },
  },
  getEventPageTitle: (event: { name: string } | null | undefined): string => {
    if (event) {
      return event.name + " はいつがいいですか？ by " + Site.name;
    }
    return Site.name;
  },
  getEventPageDescription: (
    event: { name: string; description: string | null | undefined } | null,
  ): string => {
    if (event) {
      if (event.description && event.description.length > 0) {
        return event.description;
      }
      return Site.slogan;
    }
    return "イベントが見つかりません";
  },
  getPageUri: (path: string): string => {
    const url = process.env.SITE_DOMAIN
      ? "https://" + process.env.SITE_DOMAIN
      : "";
    return url + (path.startsWith("/") ? "" : "/") + path;
  },
  getEventPageUri: (eventPath: string): string => {
    return Site.getPageUri(Site.getEventPagePath(eventPath));
  },
  getEventPagePath: (eventPath: string): string => {
    return Site.eventPagePath() + eventPath;
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
    queryArray: queryString.ParsedQuery<string>,
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
