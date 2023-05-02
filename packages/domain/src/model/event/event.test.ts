import { UpcomingEvent } from "./event";

describe("イベント作成", () => {
  it("イベントが正しく作成でき、シリアライズできる", () => {
    const event = UpcomingEvent.new({
      name: "EventName",
      path: "12345678901234567890123456789012",
      schedules: [{ date: "2023/04/15" }, { date: "2023/04/16" }],
      guests: [],
    });
    expect(event.serialize()).toStrictEqual({
      description: undefined,
      name: "EventName",
      path: "12345678901234567890123456789012",
      schedules: [{ date: "2023/04/15" }, { date: "2023/04/16" }],
      guests: [],
    });
  });
});
