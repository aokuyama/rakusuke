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
    expect(site.parseEventPathByQuery("")).toBe(null);
    expect(site.parseEventPathByQuery("p=1234567890Abcdef")).toBe(
      "1234567890Abcdef",
    );
    expect(site.parseEventPathByQuery("p=1234567890123456")).toBe(
      "1234567890123456",
    );
    expect(site.parseEventPathByQuery("P=1234567890Abcdef")).toBe(null);
    expect(site.parseEventPathByQuery("p=1234567890Abcdef&a=1")).toBe(
      "1234567890Abcdef",
    );
    expect(site.parseEventPathByQuery("&p=1234567890Abcdef")).toBe(
      "1234567890Abcdef",
    );
  });
  it("イベントパスを正しく解析できる", () => {
    expect(site.parseEventPathByPath("")).toBe(null);
    expect(site.parseEventPathByPath("/e/1234567890Abcdef/")).toBe(
      "1234567890Abcdef",
    );
    expect(site.parseEventPathByPath("/e/")).toBe(null);
    expect(site.parseEventPathByPath("/e/1234567890Abcdef")).toBe(
      "1234567890Abcdef",
    );
    expect(site.parseEventPathByPath("/e/1234567890Abcdef/a")).toBe(null);
    expect(site.parseEventPathByPath("/E/1234567890Abcdef/")).toBe(null);
  });
  it("イベントパスを正しく生成できる", () => {
    process.env.SITE_DOMAIN = "example.com";
    expect(site.getPageUri("img/ogp.jpg")).toBe(
      "https://example.com/img/ogp.jpg",
    );
    expect(site.getPageUri("/img/ogp.jpg")).toBe(
      "https://example.com/img/ogp.jpg",
    );
    expect(site.getEventPageUri("1234567890Abcdef")).toBe(
      "https://example.com/e/1234567890Abcdef",
    );
  });
});
