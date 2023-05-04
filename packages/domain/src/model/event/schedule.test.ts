import { EventDates } from "./date_list";
import { Schedules } from "./schedule";

const schedulesRows = [
  { date: "2023/04/15" },
  { date: "2023/04/16" },
  { date: "2023/04/18" },
];
describe("スケジュール作成", () => {
  it("スケジュールが正しく作成できる", () => {
    const schedules = Schedules.new(schedulesRows);
    expect(schedules.value).toStrictEqual(schedulesRows);
  });

  it("日付が空の場合失敗する", () => {
    expect(() => {
      Schedules.new([]);
    }).toThrow("at least one date is required");
  });

  it("日付が20を超える場合失敗する", () => {
    expect(() => {
      Schedules.new(
        [
          "2023/04/14",
          "2023/04/15",
          "2023/04/16",
          "2023/04/17",
          "2023/04/18",
          "2023/04/19",
          "2023/04/20",
          "2023/04/21",
          "2023/04/22",
          "2023/04/23",
          "2023/04/24",
          "2023/04/25",
          "2023/04/26",
          "2023/04/27",
          "2023/04/28",
          "2023/04/29",
          "2023/04/30",
          "2023/05/01",
          "2023/05/02",
          "2023/05/03",
          "2023/05/04",
        ].map((d) => {
          return { date: d };
        })
      );
    }).toThrow("dates must be 20 num or less");
  });

  it("日付に重複があると失敗する", () => {
    expect(() => {
      Schedules.new([
        { date: "2023/04/15" },
        { date: "2023/04/16" },
        { date: "2023/04/16" },
      ]);
    }).toThrow("duplicate date");
  });
});

describe("スケジュール更新", () => {
  const current = Schedules.new(schedulesRows);
  it("日付を追加する", () => {
    const newDates1 = EventDates.new([
      "2023/04/15",
      "2023/04/16",
      "2023/04/18",
      "2023/04/19",
    ]);
    const newschedules1 = current.updateDates(newDates1);
    expect(newschedules1.schedules.value).toStrictEqual([
      { date: "2023/04/15" },
      { date: "2023/04/16" },
      { date: "2023/04/18" },
      { date: "2023/04/19" },
    ]);
    expect(newschedules1.addedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/19",
    ]);
    expect(newschedules1.removedDates.length).toBe(0);

    const newDates2 = EventDates.new([
      "2023/04/13",
      "2023/04/15",
      "2023/04/16",
      "2023/04/17",
      "2023/04/18",
      "2023/04/19",
    ]);
    const newschedules2 = newschedules1.schedules.updateDates(newDates2);
    expect(newschedules2.schedules.value).toStrictEqual([
      { date: "2023/04/13" },
      { date: "2023/04/15" },
      { date: "2023/04/16" },
      { date: "2023/04/17" },
      { date: "2023/04/18" },
      { date: "2023/04/19" },
    ]);
    expect(newschedules2.addedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/13",
      "2023/04/17",
    ]);
    expect(newschedules2.removedDates.length).toBe(0);

    expect(current.value).toStrictEqual(schedulesRows);
  });
  it("日付を取り除く", () => {
    const newDates1 = EventDates.new(["2023/04/16", "2023/04/18"]);
    const newschedules1 = current.updateDates(newDates1);
    expect(newschedules1.schedules.value).toStrictEqual([
      { date: "2023/04/16" },
      { date: "2023/04/18" },
    ]);
    expect(newschedules1.removedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/15",
    ]);
    expect(newschedules1.addedDates.length).toBe(0);

    const newDates2 = EventDates.new(["2023/04/18"]);
    const newschedules2 = newschedules1.schedules.updateDates(newDates2);
    expect(newschedules2.schedules.value).toStrictEqual([
      { date: "2023/04/18" },
    ]);
    expect(newschedules2.removedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/16",
    ]);
    expect(newschedules2.addedDates.length).toBe(0);

    expect(current.value).toStrictEqual(schedulesRows);
  });
  it("日付を追加し取り除く", () => {
    const newDates1 = EventDates.new([
      "2023/04/14",
      "2023/04/16",
      "2023/04/19",
      "2023/04/21",
    ]);
    const newschedules1 = current.updateDates(newDates1);
    expect(newschedules1.schedules.value).toStrictEqual([
      { date: "2023/04/14" },
      { date: "2023/04/16" },
      { date: "2023/04/19" },
      { date: "2023/04/21" },
    ]);
    expect(newschedules1.addedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/14",
      "2023/04/19",
      "2023/04/21",
    ]);
    expect(newschedules1.removedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/15",
      "2023/04/18",
    ]);

    const newDates2 = EventDates.new(["2023/05/04"]);
    const newschedules2 = newschedules1.schedules.updateDates(newDates2);
    expect(newschedules2.schedules.value).toStrictEqual([
      { date: "2023/05/04" },
    ]);
    expect(newschedules2.addedDates.map((d) => d.toString())).toStrictEqual([
      "2023/05/04",
    ]);
    expect(newschedules2.removedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/14",
      "2023/04/16",
      "2023/04/19",
      "2023/04/21",
    ]);

    expect(current.value).toStrictEqual(schedulesRows);
  });
});
