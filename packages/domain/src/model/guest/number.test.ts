import { GuestNumber } from "./number";

describe("自動採番", () => {
  it("既存のものと重複しない番号が割り振られる", () => {
    expect(GuestNumber.generate([1]).value).toBe(2);
    expect(GuestNumber.generate([1, 3, 2]).value).toBe(4);
    expect(GuestNumber.generate([1, 5]).value).toBe(6);
  });
  it("新規であれば1が割り振られる", () => {
    expect(GuestNumber.generate([]).value).toBe(1);
  });
});

describe("通常生成", () => {
  it("0以下の場合失敗する", () => {
    expect(() => {
      new GuestNumber(0);
    }).toThrow("invalid guest number");
    expect(() => {
      new GuestNumber(-1);
    }).toThrow("invalid guest number");
  });
});
