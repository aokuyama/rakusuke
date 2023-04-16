import { NewEvent } from "./event";

describe("イベント作成", () => {
  it("イベントが正しく作成できる", () => {
    const event = new NewEvent("EventName", ["2023/04/15"]);
    expect(event.name).toBe("EventName");
    expect(event.path.length).toBe(32);
  });

  it("名前が空の場合失敗する", () => {
    expect(() => {
      new NewEvent("", ["2023/04/15"]);
    }).toThrow("event must have a name");
  });

  it("日付が空の場合失敗する", () => {
    expect(() => {
      new NewEvent("event", []);
    }).toThrow("at least one date is required");
  });
});
