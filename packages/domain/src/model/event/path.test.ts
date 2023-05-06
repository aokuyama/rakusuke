import { EventPath } from "./path";

describe("イベントオブジェクト", () => {
  it("パスは32文字", () => {
    expect(() => {
      new EventPath("1234567890123456789012345678901");
    }).toThrow("path must be 32 characters");
    expect(() => {
      new EventPath("123456789012345678901234567890123");
    }).toThrow("path must be 32 characters");
    expect(() => {
      new EventPath("");
    }).toThrow("path must be 32 characters");
  });
});
