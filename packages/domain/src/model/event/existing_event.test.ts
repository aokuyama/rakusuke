import { UserID } from "../user";
import { ExistingEvent } from "./existing_event";
import { EventPath } from "./path";

const eventProps = {
  uuid: "00000000-0000-0000-0000-000000000000",
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
  created: "2023/04/15",
};

const newEvent = () => {
  return ExistingEvent.new({
    uuid: eventProps.uuid,
    id: eventProps.id,
    organizerId: eventProps.organizerId,
    name: eventProps.name,
    path: new EventPath(eventProps.path),
    schedules: eventProps.schedules,
    guests: eventProps.guests,
    description: eventProps.description,
    created: eventProps.created,
  });
};

describe("イベント作成", () => {
  it("イベントが正しく作成でき、シリアライズできる", () => {
    const event = newEvent();
    expect(event.serialize()).toStrictEqual(eventProps);
  });
});

describe("主催者判定", () => {
  it("ユーザーIDをもとに、そのユーザーが主催かどうか判定ができる", () => {
    const event = newEvent();
    expect(event.isOrganizer(new UserID(1))).toBe(true);
    expect(event.isOrganizer(new UserID(2))).toBe(false);
    expect(event.isOrganizer(new UserID(100))).toBe(false);
  });
});
