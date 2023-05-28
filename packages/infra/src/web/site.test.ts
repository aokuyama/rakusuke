import { Site } from "./site";

const site = Site;

describe("webサイトデータ", () => {
  it("イベントページを正しく判定できる", () => {
    expect(site.isEventPagePath("/")).toBeFalsy();
    expect(site.isEventPagePath("")).toBeFalsy();
    expect(site.isEventPagePath("/e/")).toBeTruthy();
    expect(site.isEventPagePath("/e")).toBeFalsy();
    expect(site.isEventPagePath("/e/1234567890123456")).toBeFalsy();
  });
  it("パス付きクエリを正しく解析できる", () => {
    expect(site.parseEventPathQuery("")).toBe(null);
    expect(site.parseEventPathQuery("p=1234567890Abcdef")).toBe(
      "1234567890Abcdef"
    );
    expect(site.parseEventPathQuery("p=1234567890123456")).toBe(
      "1234567890123456"
    );
    expect(site.parseEventPathQuery("P=1234567890Abcdef")).toBe(null);
    expect(site.parseEventPathQuery("p=1234567890Abcdef&")).toBe(null);
    expect(site.parseEventPathQuery("&p=1234567890Abcdef")).toBe(null);
  });
});
