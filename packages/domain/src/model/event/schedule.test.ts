import { EventDates } from "./date_list";
import { Schedules } from "./schedule";

const schedulesRows = [
  { date: "2023/04/15", held: false },
  { date: "2023/04/16", held: false },
  { date: "2023/04/18", held: false },
];
describe("スケジュール作成", () => {
  it("スケジュールが正しく作成できる", () => {
    const schedules = Schedules.new(schedulesRows);
    expect(schedules.serialize()).toStrictEqual(schedulesRows);
  });

  it("日付が空の場合失敗する", () => {
    expect(() => {
      Schedules.new([]);
    }).toThrow("at least one date is required");
  });

  it("日付が20を超える場合失敗する", () => {
    expect(() => {
      Schedules.create(
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
        }),
      );
    }).toThrow("dates must be 20 num or less");
  });

  it("日付に重複があると失敗する", () => {
    expect(() => {
      Schedules.new([
        { date: "2023/04/15", held: false },
        { date: "2023/04/16", held: false },
        { date: "2023/04/16", held: false },
      ]);
    }).toThrow("duplicate date");
  });

  it("スケジュールは日付順に作成される", () => {
    const schedules = Schedules.new([
      { date: "2023/04/18", held: false },
      { date: "2023/04/15", held: false },
      { date: "2023/04/16", held: false },
    ]);
    expect(schedules.serialize()).toStrictEqual(schedulesRows);
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
    expect(newschedules1.schedules.serialize()).toStrictEqual([
      { date: "2023/04/15", held: false },
      { date: "2023/04/16", held: false },
      { date: "2023/04/18", held: false },
      { date: "2023/04/19", held: false },
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
    expect(newschedules2.schedules.serialize()).toStrictEqual([
      { date: "2023/04/13", held: false },
      { date: "2023/04/15", held: false },
      { date: "2023/04/16", held: false },
      { date: "2023/04/17", held: false },
      { date: "2023/04/18", held: false },
      { date: "2023/04/19", held: false },
    ]);
    expect(newschedules2.addedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/13",
      "2023/04/17",
    ]);
    expect(newschedules2.removedDates.length).toBe(0);

    expect(current.serialize()).toStrictEqual(schedulesRows);
  });
  it("日付を取り除く", () => {
    const newDates1 = EventDates.new(["2023/04/16", "2023/04/18"]);
    const newschedules1 = current.updateDates(newDates1);
    expect(newschedules1.schedules.serialize()).toStrictEqual([
      { date: "2023/04/16", held: false },
      { date: "2023/04/18", held: false },
    ]);
    expect(newschedules1.removedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/15",
    ]);
    expect(newschedules1.addedDates.length).toBe(0);

    const newDates2 = EventDates.new(["2023/04/18"]);
    const newschedules2 = newschedules1.schedules.updateDates(newDates2);
    expect(newschedules2.schedules.serialize()).toStrictEqual([
      { date: "2023/04/18", held: false },
    ]);
    expect(newschedules2.removedDates.map((d) => d.toString())).toStrictEqual([
      "2023/04/16",
    ]);
    expect(newschedules2.addedDates.length).toBe(0);

    expect(current.serialize()).toStrictEqual(schedulesRows);
  });
  it("日付を追加し取り除く", () => {
    const newDates1 = EventDates.new([
      "2023/04/14",
      "2023/04/16",
      "2023/04/19",
      "2023/04/21",
    ]);
    const newschedules1 = current.updateDates(newDates1);
    expect(newschedules1.schedules.serialize()).toStrictEqual([
      { date: "2023/04/14", held: false },
      { date: "2023/04/16", held: false },
      { date: "2023/04/19", held: false },
      { date: "2023/04/21", held: false },
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
    expect(newschedules2.schedules.serialize()).toStrictEqual([
      { date: "2023/05/04", held: false },
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

    expect(current.serialize()).toStrictEqual(schedulesRows);
  });

  it("すでに開催日があった場合、オフになる", () => {
    const helds = Schedules.new([
      { date: "2023/04/15", held: false },
      { date: "2023/04/16", held: true },
      { date: "2023/04/18", held: false },
    ]);

    const newDates1 = EventDates.new([
      "2023/04/14",
      "2023/04/16",
      "2023/04/19",
      "2023/04/21",
    ]);
    const newschedules1 = helds.updateDates(newDates1);
    expect(newschedules1.schedules.serialize()).toStrictEqual([
      { date: "2023/04/14", held: false },
      { date: "2023/04/16", held: false },
      { date: "2023/04/19", held: false },
      { date: "2023/04/21", held: false },
    ]);
    expect(
      newschedules1.updatedSchedules.map((s) => s.serialize()),
    ).toStrictEqual([{ date: "2023/04/16", held: false }]);

    const newDates2 = EventDates.new([
      "2023/04/14",
      "2023/04/19",
      "2023/04/21",
    ]);
    const newschedules2 = helds.updateDates(newDates2);
    expect(newschedules2.schedules.serialize()).toStrictEqual([
      { date: "2023/04/14", held: false },
      { date: "2023/04/19", held: false },
      { date: "2023/04/21", held: false },
    ]);
    expect(newschedules2.updatedSchedules.length).toBe(0);
  });
});
