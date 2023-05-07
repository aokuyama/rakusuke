import { LocalStorage } from "infra/src/storage/local";

export const Site = {
  name: "らくスケ",
  slogan: "この世界で最もラクな日程調整ツール",
  eventPlaceholder: "（例:お花見会）",
};

export const storage = new LocalStorage();
