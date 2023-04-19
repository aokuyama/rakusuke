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

  it("名前が30文字を超える場合失敗する", () => {
    expect(() => {
      new NewEvent(
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほ",
        ["2023/04/15"]
      );
    }).toBeTruthy();
    expect(() => {
      new NewEvent(
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほa",
        ["2023/04/15"]
      );
    }).toThrow("name must be 30 characters or less");
    expect(() => {
      new NewEvent("abcdefghijklmnopqrstuvwxyz0123", ["2023/04/15"]);
    }).toBeTruthy();
    expect(() => {
      new NewEvent("abcdefghijklmnopqrstuvwxyz01234", ["2023/04/15"]);
    }).toThrow("name must be 30 characters or less");
  });

  it("日付が空の場合失敗する", () => {
    expect(() => {
      new NewEvent("event", []);
    }).toThrow("at least one date is required");
  });

  it("日付が20を超える場合失敗する", () => {
    expect(() => {
      new NewEvent("20の日付", [
        "2023/04/15",
        "2023/04/16",
        "2023/04/17",
        "2023/04/18",
        "2023/04/19",
        "2023/04/20",
        "2023/04/21",
        "2023/04/22",
        "2023/04/23",
        "2023/04/24",
        "2023/04/25",
        "2023/04/26",
        "2023/04/27",
        "2023/04/28",
        "2023/04/29",
        "2023/04/30",
        "2023/05/01",
        "2023/05/02",
        "2023/05/03",
        "2023/05/04",
      ]);
    }).toBeTruthy();
    expect(() => {
      new NewEvent("21の日付", [
        "2023/04/14",
        "2023/04/15",
        "2023/04/16",
        "2023/04/17",
        "2023/04/18",
        "2023/04/19",
        "2023/04/20",
        "2023/04/21",
        "2023/04/22",
        "2023/04/23",
        "2023/04/24",
        "2023/04/25",
        "2023/04/26",
        "2023/04/27",
        "2023/04/28",
        "2023/04/29",
        "2023/04/30",
        "2023/05/01",
        "2023/05/02",
        "2023/05/03",
        "2023/05/04",
      ]);
    }).toThrow("dates must be 20 num or less");
  });

  it("日付に重複があると失敗する", () => {
    expect(() => {
      new NewEvent("event", ["2023/04/15", "2023/04/15"]);
    }).toThrow("duplicate date");
  });
});
