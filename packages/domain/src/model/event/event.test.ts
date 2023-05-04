import { CurrentAttendanceList, NewAttendanceList } from "./attendance";
import { UpcomingEvent } from "./event";

const eventProps = {
  name: "EventName",
  path: "12345678901234567890123456789012",
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
    expect(event.checkList(attendance)).toStrictEqual([
      { id: "20230415", name: "2023/04/15", checked: false },
      { id: "20230416", name: "2023/04/16", checked: true },
      { id: "20230417", name: "2023/04/17", checked: false },
    ]);
    const attendance2 = NewAttendanceList.new([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: true },
    ]);
    expect(event.checkList(attendance2)).toStrictEqual([
      { id: "20230415", name: "2023/04/15", checked: true },
      { id: "20230416", name: "2023/04/16", checked: true },
      { id: "20230417", name: "2023/04/17", checked: true },
    ]);
  });
  it("出欠リストにない場合、falseで補完する", () => {
    const event = UpcomingEvent.new(eventProps);
    const attendance = NewAttendanceList.new([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/17", attend: false },
    ]);
    expect(event.checkList(attendance)).toStrictEqual([
      { id: "20230415", name: "2023/04/15", checked: true },
      { id: "20230416", name: "2023/04/16", checked: false },
      { id: "20230417", name: "2023/04/17", checked: false },
    ]);
    const attendance2 = NewAttendanceList.new([
      { date: "2023/04/14", attend: true },
    ]);
    expect(event.checkList(attendance2)).toStrictEqual([
      { id: "20230415", name: "2023/04/15", checked: false },
      { id: "20230416", name: "2023/04/16", checked: false },
      { id: "20230417", name: "2023/04/17", checked: false },
    ]);
    const attendance3 = CurrentAttendanceList.new([]);
    expect(event.checkList(attendance3)).toStrictEqual([
      { id: "20230415", name: "2023/04/15", checked: false },
      { id: "20230416", name: "2023/04/16", checked: false },
      { id: "20230417", name: "2023/04/17", checked: false },
    ]);
  });
});
