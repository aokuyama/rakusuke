import { EventName } from "./name";

describe("イベント名作成", () => {
  it("名前が空の場合失敗する", () => {
    expect(() => {
      new EventName("");
    }).toThrow("event must have a name");
  });

  it("名前が30文字を超える場合失敗する", () => {
    expect(() => {
      new EventName(
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほ",
      );
    }).toBeTruthy();
    expect(() => {
      new EventName(
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほa",
      );
    }).toThrow("name must be 30 characters or less");
    expect(() => {
      new EventName("abcdefghijklmnopqrstuvwxyz0123");
    }).toBeTruthy();
    expect(() => {
      new EventName("abcdefghijklmnopqrstuvwxyz01234");
    }).toThrow("name must be 30 characters or less");
  });
});
