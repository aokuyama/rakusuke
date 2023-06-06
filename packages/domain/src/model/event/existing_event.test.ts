import { UserID } from "../user";
import { ExistingEvent } from "./existing_event";
import { EventPath } from "./path";
import { Date } from "./date";

const eventProps = {
  uuid: "00000000-0000-0000-0000-000000000000",
  id: 1,
  organizerId: 1,
  name: "EventName",
  path: "1234567890123456",
  schedules: [
    { date: "2023/04/15", held: false },
    { date: "2023/04/16", held: false },
    { date: "2023/04/17", held: false },
  ],
  guests: [],
  description: undefined,
  created: "2023/04/15",
};

const newEvent = (schedules?: { date: string; held: boolean }[]) => {
  return ExistingEvent.new({
    uuid: eventProps.uuid,
    id: eventProps.id,
    organizerId: eventProps.organizerId,
    name: eventProps.name,
    path: new EventPath(eventProps.path),
    schedules: schedules ? schedules : eventProps.schedules,
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

describe("開催日決定", () => {
  it("指定した開催日の差分が作られる", () => {
    const event = newEvent();
    const { schedules, updatedSchedules } = event.makeHeldUpdatedSchedules(
      new Date("2023/04/15")
    );
    expect(schedules.value).toStrictEqual([
      { date: "2023/04/15", held: true },
      { date: "2023/04/16", held: false },
      { date: "2023/04/17", held: false },
    ]);
    expect(updatedSchedules[0].serialize()).toStrictEqual({
      date: "2023/04/15",
      held: true,
    });

    const d2 = event.makeHeldUpdatedSchedules(new Date("2023/04/16"));
    expect(d2.schedules.value).toStrictEqual([
      { date: "2023/04/15", held: false },
      { date: "2023/04/16", held: true },
      { date: "2023/04/17", held: false },
    ]);
    expect(d2.updatedSchedules[0].serialize()).toStrictEqual({
      date: "2023/04/16",
      held: true,
    });
  });
  it("他の開催日は解除される", () => {
    const event = newEvent([
      { date: "2023/06/15", held: false },
      { date: "2023/06/16", held: false },
      { date: "2023/06/17", held: true },
    ]);
    const { schedules, updatedSchedules } = event.makeHeldUpdatedSchedules(
      new Date("2023/06/16")
    );
    expect(schedules.value).toStrictEqual([
      { date: "2023/06/15", held: false },
      { date: "2023/06/16", held: true },
      { date: "2023/06/17", held: false },
    ]);
    expect(updatedSchedules.map((s) => s.serialize())).toStrictEqual([
      { date: "2023/06/16", held: true },
      { date: "2023/06/17", held: false },
    ]);

    const d2 = event.makeHeldUpdatedSchedules(new Date("2023/06/15"));
    expect(d2.schedules.value).toStrictEqual([
      { date: "2023/06/15", held: true },
      { date: "2023/06/16", held: false },
      { date: "2023/06/17", held: false },
    ]);
    expect(d2.updatedSchedules.map((s) => s.serialize())).toStrictEqual([
      { date: "2023/06/15", held: true },
      { date: "2023/06/17", held: false },
    ]);
  });

  it("開催日の差分が作られない", () => {
    const event = newEvent([
      { date: "2023/06/15", held: true },
      { date: "2023/06/16", held: false },
      { date: "2023/06/17", held: false },
    ]);
    const { schedules, updatedSchedules } = event.makeHeldUpdatedSchedules(
      new Date("2023/06/15")
    );
    expect(schedules.value).toStrictEqual([
      { date: "2023/06/15", held: true },
      { date: "2023/06/16", held: false },
      { date: "2023/06/17", held: false },
    ]);
    expect(updatedSchedules.length).toBe(0);
  });

  it("無い日付を指定するとエラー", () => {
    const event = newEvent();
    expect(() => {
      event.makeHeldUpdatedSchedules(new Date("2023/05/15"));
    }).toThrow("undefined date");
    expect(() => {
      event.makeHeldUpdatedSchedules(new Date("2022/04/15"));
    }).toThrow("undefined date");
  });
});
