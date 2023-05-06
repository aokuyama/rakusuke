import { createToken } from ".";

describe("トークン作成", () => {
  it("毎度別のトークンが生成される", () => {
    // 天文学的な確率で失敗することがある
    const token = createToken(32);
    expect(token == createToken(32)).toBeFalsy();
    expect(token == createToken(32)).toBeFalsy();
    expect(token == createToken(32)).toBeFalsy();
  });
  it("指定した文字数で作成される", () => {
    expect(createToken(32).length).toBe(32);
  });
});
