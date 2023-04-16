import { createEventPath } from "./path";

test("毎度別のパスが生成される", () => {
  // 天文学的な確率で失敗することがある
  expect(createEventPath() == createEventPath()).toBeFalsy();
});
