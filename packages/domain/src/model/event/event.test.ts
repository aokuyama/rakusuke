import { NewAttendanceList } from "./attendance";
import { CurrentEvent } from "./event";

const eventProps = {
  uuid: "00000000-0000-0000-0000-000000000000",
  name: "EventName",
  path: "1234567890123456",
  isOrganizer: false,
  schedules: [
    { date: "2023/04/15", held: false },
    { date: "2023/04/16", held: false },
    { date: "2023/04/17", held: false },
  ],
  guests: [],
  description: undefined,
  created: "2023/04/15",
};

describe("イベント作成", () => {
  it("イベントが正しく作成でき、シリアライズできる", () => {
    const event = CurrentEvent.new(eventProps);
    expect(event.serialize()).toStrictEqual(eventProps);
  });
  it("同一のイベントか正しく判断できる", () => {
    const event = CurrentEvent.new(eventProps);
    expect(event.sameIdAs(event)).toBe(true);
    const event2 = CurrentEvent.new({
      uuid: "00000000-0000-0000-0000-000000000000",
      name: "EventNameaaa",
      path: "1234567890123451",
      isOrganizer: true,
      schedules: [
        { date: "2023/04/14", held: false },
        { date: "2023/04/16", held: false },
        { date: "2023/04/17", held: false },
      ],
      guests: [],
      description: undefined,
      created: "2023/04/15",
    });
    expect(event.sameIdAs(event2)).toBe(true);
    const event3 = CurrentEvent.new({
      uuid: "93803acc-a876-4e38-9ed6-3ee87f0dfc76",
      name: "EventName",
      path: "1234567890123456",
      isOrganizer: false,
      schedules: [
        { date: "2023/04/15", held: false },
        { date: "2023/04/16", held: false },
        { date: "2023/04/17", held: false },
      ],
      guests: [],
      description: undefined,
      created: "2023/04/15",
    });
    expect(event.sameIdAs(event3)).toBe(false);
  });
});

describe("チェックリスト作成", () => {
  it("スケジュールに対する出欠チェックリストを生成する", () => {
    const event = CurrentEvent.new(eventProps);
    const attendance = NewAttendanceList.new([
      { date: "2023/04/15", attend: false },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: false },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance).serialize()
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
      event.newAttendanceByCurrentAttendance(attendance2).serialize()
    ).toStrictEqual([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/16", attend: true },
      { date: "2023/04/17", attend: true },
    ]);
  });
  it("出欠リストにない場合、falseで補完する", () => {
    const event = CurrentEvent.new(eventProps);
    const attendance = NewAttendanceList.new([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/17", attend: false },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance).serialize()
    ).toStrictEqual([
      { date: "2023/04/15", attend: true },
      { date: "2023/04/16", attend: false },
      { date: "2023/04/17", attend: false },
    ]);
    const attendance2 = NewAttendanceList.new([
      { date: "2023/04/14", attend: true },
    ]);
    expect(
      event.newAttendanceByCurrentAttendance(attendance2).serialize()
    ).toStrictEqual([
      { date: "2023/04/15", attend: false },
      { date: "2023/04/16", attend: false },
      { date: "2023/04/17", attend: false },
    ]);
  });
});
