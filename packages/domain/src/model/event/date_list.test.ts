import { DateList } from "./date_list";
import { Date } from "./date";

test("日付からスケジュール追加", () => {
  const list = new DateList([]);
  const list1 = list.toggleByDate(new Date("2023/04/15"));
  expect(list1.length()).toBe(1);
  expect(list.length()).toBe(0);
  const list2 = list1.toggleByDate(new Date("2023/04/16"));
  expect(list.length()).toBe(0);
  expect(list1.length()).toBe(1);
  expect(list2.length()).toBe(2);
  expect(list1.getDateStrings()).toEqual(["2023/04/15"]);
  expect(list2.getDateStrings()).toEqual(["2023/04/15", "2023/04/16"]);
});

test("同じ日付のスケジュールは消える", () => {
  const list = new DateList([]);
  const list2 = list
    .toggleByDate(new Date("2023/04/15"))
    .toggleByDate(new Date("2023/04/16"));
  const list1 = list2.toggleByDate(new Date("2023/04/15"));
  expect(list1.length()).toBe(1);
  expect(list1.getDateStrings()).toEqual(["2023/04/16"]);
});

test("日付順にソートされる", () => {
  const list = new DateList([]);
  const list3 = list
    .toggleByDate(new Date("2023/04/15"))
    .toggleByDate(new Date("2023/04/14"))
    .toggleByDate(new Date("2023/04/16"));
  expect(list3.getDateStrings()).toEqual([
    "2023/04/14",
    "2023/04/15",
    "2023/04/16",
  ]);
});
