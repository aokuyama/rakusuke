import { UserID } from "../user";
import { ExistingEvent } from "./existing_event";

const eventProps = {
  id: 1,
  organizerId: 1,
  name: "EventName",
  path: "1234567890123456",
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
    const event = ExistingEvent.new(eventProps);
    expect(event.serialize()).toStrictEqual(eventProps);
  });
});

describe("主催者判定", () => {
  it("ユーザーIDをもとに、そのユーザーが主催かどうか判定ができる", () => {
    const event = ExistingEvent.new(eventProps);
    expect(event.isOrganizer(new UserID(1))).toBe(true);
    expect(event.isOrganizer(new UserID(2))).toBe(false);
    expect(event.isOrganizer(new UserID(100))).toBe(false);
  });
});
