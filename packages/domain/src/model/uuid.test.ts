import { UUID, NewUUID } from "./uuid";

describe("UUID作成", () => {
  it("毎度別のUUIDが生成される", () => {
    const uuid = NewUUID.create();
    expect(uuid.value == NewUUID.create().value).toBeFalsy();
    expect(uuid.value == NewUUID.create().value).toBeFalsy();
    expect(uuid.value == NewUUID.create().value).toBeFalsy();
  });
  it("正常なUUID", () => {
    const uuid = new UUID("c7be9e03-6075-4921-a1e7-bcd59d798f5a");
    expect(uuid.value == "c7be9e03-6075-4921-a1e7-bcd59d798f5a").toBeTruthy();
  });
  it("不正なUUID", () => {
    expect(() => {
      new UUID("abcdefghijklmnopqrstuvwxwz1234567890");
    }).toThrow("invalid uuid");
  });
});
