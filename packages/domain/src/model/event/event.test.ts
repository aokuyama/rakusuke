import { NewAttendanceList } from "./attendance";
import { UpcomingEvent } from "./event";

const eventProps = {
  name: "EventName",
  path: "12345678901234567890123456789012",
  isOrganizer: false,
  schedules: [
    { date: "2023/04/15" },
    { date: "2023/04/16" },
    { date: "2023/04/17" },
  ],
  guests: [],
  description: undefined,
};

describe("イベント作成", () => {
  it("イベントが正しく作成でき、シリアライズできる", () => {
    const event = UpcomingEvent.new(eventProps);
    expect(event.serialize()).toStrictEqual(eventProps);
  });
});

describe("チェックリスト作成", () => {
  it("スケジュールに対する出欠チェックリストを生成する", () => {
    const event = UpcomingEvent.new(eventProps);
    const attendance = NewAttendanceList.new([
      { date: "2023/04/15", attend: false },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: false },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance).value
    ).toStrictEqual([
      { date: "2023/04/15", attend: false },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: false },
    ]);
    const attendance2 = NewAttendanceList.new([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: true },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance2).value
    ).toStrictEqual([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: true },
    ]);
  });
  it("出欠リストにない場合、falseで補完する", () => {
    const event = UpcomingEvent.new(eventProps);
    const attendance = NewAttendanceList.new([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/17", attend: false },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance).value
    ).toStrictEqual([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/16", attend: false },
      { date: "2023/04/17", attend: false },
    ]);
    const attendance2 = NewAttendanceList.new([
      { date: "2023/04/14", attend: true },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance2).value
    ).toStrictEqual([
      { date: "2023/04/15", attend: false },
      { date: "2023/04/16", attend: false },
      { date: "2023/04/17", attend: false },
    ]);
  });
});
