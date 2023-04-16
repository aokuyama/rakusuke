import { createEventPath } from "./path";

describe("イベントパス作成", () => {
  it("毎度別のパスが生成される", () => {
    // 天文学的な確率で失敗することがある
    expect(createEventPath() == createEventPath()).toBeFalsy();
  });
  it("パスは32文字", () => {
    expect(createEventPath().length).toBe(32);
  });
});
