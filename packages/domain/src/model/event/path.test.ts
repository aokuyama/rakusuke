import { EventPath } from "./path";

describe("イベントパス", () => {
  it("正しく生成できる", () => {
    const path = new EventPath("1234567890abcdef");
    expect(path.rawValue()).toBe("1234567890abcdef");
    expect(new EventPath("1234567890123456").rawValue()).toBe(
      "1234567890123456",
    );
  });
  it("パスは16文字", () => {
    expect(() => {
      new EventPath("123456789012345");
    }).toThrow("path must be 16 characters");
    expect(() => {
      new EventPath("12345678901234567");
    }).toThrow("path must be 16 characters");
    expect(() => {
      new EventPath("");
    }).toThrow("path must be 16 characters");
  });
});

describe("イベントパスのセーフモード", () => {
  it("正しく生成できる", () => {
    expect(
      EventPath.newSafe("1234567890123456")?.equals(
        new EventPath("1234567890123456"),
      ),
    ).toBe(true);
    expect(
      EventPath.newSafe("1234567890abcdef")?.equals(
        new EventPath("1234567890abcdef"),
      ),
    ).toBe(true);
  });
  it("生成できない場合はundefinedを返す", () => {
    expect(EventPath.newSafe("1234567890abcde")).toBe(undefined);
    expect(EventPath.newSafe("1234567890abcdefg")).toBe(undefined);
  });
});
