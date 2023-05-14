import { EventPath } from "./path";

describe("イベントオブジェクト", () => {
  it("パスは16文字", () => {
    expect(() => {
      new EventPath("1234567890123456789012345");
    }).toThrow("path must be 16 characters");
    expect(() => {
      new EventPath("123456789012345678901234567");
    }).toThrow("path must be 16 characters");
    expect(() => {
      new EventPath("");
    }).toThrow("path must be 16 characters");
  });
});
