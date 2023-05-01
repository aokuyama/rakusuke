import { Attendance, AttendanceList } from "./attendance";
import { Date } from "./date";

describe("出欠", () => {
  const date1 = new Date("2023/04/15");
  it("正しく生成できる", () => {
    const attendance = new Attendance({
      date: date1,
      attend: false,
    });
    expect(attendance.date).toBe(date1.toString());
    expect(attendance.attend).toBe(false);
  });
});

describe("出席票", () => {
  const date1 = new Date("2023/04/15");
  const date2 = new Date("2023/04/16");
  it("正しく生成できる", () => {
    const attendanceList = AttendanceList.create([
      {
        date: date1,
        attend: true,
      },
      {
        date: date2,
        attend: false,
      },
    ]);
    expect(attendanceList.value[0].date).toBe(date1.toString());
    expect(attendanceList.value[0].attend).toBe(true);
    expect(attendanceList.value[1].date).toBe(date2.toString());
    expect(attendanceList.value[1].attend).toBe(false);
  });

  it("日付が空の場合失敗する", () => {
    expect(() => {
      new AttendanceList([]);
    }).toThrow("at least one date is required");
  });

  it("日付に重複があると失敗する", () => {
    expect(() => {
      AttendanceList.create([
        {
          date: date1,
          attend: true,
        },
        {
          date: date1,
          attend: false,
        },
      ]);
    }).toThrow("duplicate date");
  });
});

describe("出席票スイッチ", () => {
  const date1 = new Date("2023/04/15");
  const date2 = new Date("2023/04/16");
  const date3 = new Date("2023/04/18");
  const attendanceList = AttendanceList.create([
    {
      date: date1,
      attend: false,
    },
    {
      date: date2,
      attend: false,
    },
    {
      date: date3,
      attend: false,
    },
  ]);
  it("正しくオンオフできる", () => {
    expect(attendanceList.list()).toStrictEqual([
      { checked: false, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: false, id: "20230418", name: "2023/04/18" },
    ]);
    let newList = attendanceList.switch({ id: "20230415", attend: true });
    expect(newList.list()).toStrictEqual([
      { checked: true, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: false, id: "20230418", name: "2023/04/18" },
    ]);
    newList = newList.switch({ id: "20230418", attend: true });
    expect(newList.list()).toStrictEqual([
      { checked: true, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: true, id: "20230418", name: "2023/04/18" },
    ]);
    newList = newList.switch({ id: "20230415", attend: false });
    expect(newList.list()).toStrictEqual([
      { checked: false, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: true, id: "20230418", name: "2023/04/18" },
    ]);

    expect(attendanceList.list()).toStrictEqual([
      { checked: false, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: false, id: "20230418", name: "2023/04/18" },
    ]);
  });

  it("二重押ししてもエラーにはならない", () => {
    let newList = attendanceList.switch({ id: "20230415", attend: false });
    expect(newList.list()).toStrictEqual([
      { checked: false, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: false, id: "20230418", name: "2023/04/18" },
    ]);
    newList = newList.switch({ id: "20230418", attend: true });
    newList = newList.switch({ id: "20230418", attend: true });
    expect(newList.list()).toStrictEqual([
      { checked: false, id: "20230415", name: "2023/04/15" },
      { checked: false, id: "20230416", name: "2023/04/16" },
      { checked: true, id: "20230418", name: "2023/04/18" },
    ]);
  });

  it("存在しない日付を指定するとエラーになる", () => {
    expect(() => {
      attendanceList.switch({ id: "20220415", attend: true });
    }).toThrow("20220415 is not found");
    expect(() => {
      attendanceList.switch({ id: "", attend: true });
    }).toThrow(" is not found");
  });
});
