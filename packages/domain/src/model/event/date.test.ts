import { Date } from "./date";

test("日付フォーマットが正しく取得できる", () => {
  expect(new Date("2023/04/15").toString()).toBe("2023/04/15");
  expect(new Date("2023/4/16").toString()).toBe("2023/04/16");
});