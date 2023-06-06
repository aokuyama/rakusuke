import { CurrentEvent } from "./event";
import { RecentlyViewedEvent } from "./recently_viewed";

const eventProps = (uuid?: string) => {
  if (!uuid) {
    uuid = "00000000-0000-0000-0000-000000000000";
  }
  return {
    uuid: uuid,
    name: "EventName",
    path: "1234567890123456",
    isOrganizer: false,
    schedules: [
      { date: "2023/04/15", held: false },
      { date: "2023/04/16", held: false },
      { date: "2023/04/17", held: false },
    ],
    guests: [],
    description: undefined,
    created: "2023/04/15",
  };
};

describe("イベントリスト作成", () => {
  it("空生成できる", () => {
    const events = RecentlyViewedEvent.createEmpty();
    expect(events.value).toStrictEqual([]);
  });
  it("イベントを含む状態で生成できる", () => {
    const events = RecentlyViewedEvent.new([eventProps()]);
    expect(events.value).toStrictEqual([eventProps()]);
  });
  it("重複したイベントを持てない", () => {
    expect(() => {
      RecentlyViewedEvent.new([eventProps(), eventProps()]);
    }).toThrow("duplicate uuid");
    expect(() => {
      new RecentlyViewedEvent([
        CurrentEvent.new(eventProps("8532af94-333d-41a2-a8b8-de884ca249c9")),
        CurrentEvent.new(eventProps("8532af94-333d-41a2-a8b8-de884ca249c9")),
      ]);
    }).toThrow("duplicate uuid");
  });
  it("5個を超えるイベントを持てない", () => {
    expect(() => {
      new RecentlyViewedEvent([
        CurrentEvent.new(eventProps("8532af94-333d-41a2-a8b8-de884ca249c9")),
        CurrentEvent.new(eventProps("e8443e75-97a5-4050-b5bb-88a637549128")),
        CurrentEvent.new(eventProps("c7fefda4-eab1-4371-b195-374577061df2")),
        CurrentEvent.new(eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa")),
        CurrentEvent.new(eventProps("8bf5758c-9f75-49e4-afbb-625603843985")),
        CurrentEvent.new(eventProps("9a50f62f-189e-4cf8-81cc-4e611240f5bb")),
      ]);
    }).toThrow("up to 5 recent events");
  });
});
describe("イベントリストへの追加", () => {
  it("後ろに追加される", () => {
    let events = RecentlyViewedEvent.createEmpty();
    events = events.push(
      CurrentEvent.new(eventProps("8532af94-333d-41a2-a8b8-de884ca249c9"))
    );
    events = events.push(
      CurrentEvent.new(eventProps("74ee8fa3-7c27-4217-9a0d-f1c70b6a64e6"))
    );
    events = events.push(
      CurrentEvent.new(eventProps("e8443e75-97a5-4050-b5bb-88a637549128"))
    );
    expect(events.value).toStrictEqual([
      eventProps("8532af94-333d-41a2-a8b8-de884ca249c9"),
      eventProps("74ee8fa3-7c27-4217-9a0d-f1c70b6a64e6"),
      eventProps("e8443e75-97a5-4050-b5bb-88a637549128"),
    ]);
  });
  it("重複したものを追加しようとすると、後ろに移動する", () => {
    let events = RecentlyViewedEvent.new([
      eventProps("c7fefda4-eab1-4371-b195-374577061df2"),
      eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa"),
    ]);
    events = events.push(
      CurrentEvent.new(eventProps("c7fefda4-eab1-4371-b195-374577061df2"))
    );
    expect(events.value).toStrictEqual([
      eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa"),
      eventProps("c7fefda4-eab1-4371-b195-374577061df2"),
    ]);
    events = events.push(
      CurrentEvent.new(eventProps("8532af94-333d-41a2-a8b8-de884ca249c9"))
    );
    events = events.push(
      CurrentEvent.new(eventProps("74ee8fa3-7c27-4217-9a0d-f1c70b6a64e6"))
    );
    events = events.push(
      CurrentEvent.new(eventProps("e8443e75-97a5-4050-b5bb-88a637549128"))
    );
    events = events.push(
      CurrentEvent.new(eventProps("74ee8fa3-7c27-4217-9a0d-f1c70b6a64e6"))
    );
    expect(events.value).toStrictEqual([
      eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa"),
      eventProps("c7fefda4-eab1-4371-b195-374577061df2"),
      eventProps("8532af94-333d-41a2-a8b8-de884ca249c9"),
      eventProps("e8443e75-97a5-4050-b5bb-88a637549128"),
      eventProps("74ee8fa3-7c27-4217-9a0d-f1c70b6a64e6"),
    ]);
  });
  it("5 個を超えると最も古いものが消える", () => {
    let events = RecentlyViewedEvent.new([
      eventProps("c7fefda4-eab1-4371-b195-374577061df2"),
      eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa"),
      eventProps("9a50f62f-189e-4cf8-81cc-4e611240f5bb"),
    ]);
    events = events.push(
      CurrentEvent.new(eventProps("4cc2d2b3-f6ad-467a-814f-5b1544bab259"))
    );
    events = events.push(
      CurrentEvent.new(eventProps("6e5508c1-547d-4547-91c2-2051e3bf5ed0"))
    );
    expect(events.value).toStrictEqual([
      eventProps("c7fefda4-eab1-4371-b195-374577061df2"),
      eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa"),
      eventProps("9a50f62f-189e-4cf8-81cc-4e611240f5bb"),
      eventProps("4cc2d2b3-f6ad-467a-814f-5b1544bab259"),
      eventProps("6e5508c1-547d-4547-91c2-2051e3bf5ed0"),
    ]);
    events = events.push(
      CurrentEvent.new(eventProps("1d044d27-cec6-455b-8a97-3feed018137f"))
    );
    expect(events.value).toStrictEqual([
      eventProps("f4f1575c-d815-44a7-b558-598cefb7e4fa"),
      eventProps("9a50f62f-189e-4cf8-81cc-4e611240f5bb"),
      eventProps("4cc2d2b3-f6ad-467a-814f-5b1544bab259"),
      eventProps("6e5508c1-547d-4547-91c2-2051e3bf5ed0"),
      eventProps("1d044d27-cec6-455b-8a97-3feed018137f"),
    ]);
    events = events.push(
      CurrentEvent.new(eventProps("60de95c0-6a16-4c2c-8621-0bf97af8548c"))
    );
    expect(events.value).toStrictEqual([
      eventProps("9a50f62f-189e-4cf8-81cc-4e611240f5bb"),
      eventProps("4cc2d2b3-f6ad-467a-814f-5b1544bab259"),
      eventProps("6e5508c1-547d-4547-91c2-2051e3bf5ed0"),
      eventProps("1d044d27-cec6-455b-8a97-3feed018137f"),
      eventProps("60de95c0-6a16-4c2c-8621-0bf97af8548c"),
    ]);
  });
});
