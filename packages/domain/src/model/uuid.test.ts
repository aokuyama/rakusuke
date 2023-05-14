import { UUID, NewUUID } from "./uuid";

describe("UUID作成", () => {
  it("毎度別のUUIDが生成される", () => {
    const uuid = NewUUID.create();
    expect(uuid.value == NewUUID.create().value).toBeFalsy();
    expect(uuid.value == NewUUID.create().value).toBeFalsy();
    expect(uuid.value == NewUUID.create().value).toBeFalsy();
  });
  it("不正なUUID", () => {
    expect(() => {
      new UUID("abcdefghijklmnopqrstuvwxwz1234567890");
    }).toThrow("invalid uuid");
  });
});
