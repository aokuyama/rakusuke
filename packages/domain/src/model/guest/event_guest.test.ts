import { EventGuest } from "./event_guest";
import { Date } from "../event/date";

describe("ゲスト", () => {
  it("正しく生成できる", () => {
    const guest = EventGuest.new({
      number: 1,
      name: "ゲスト",
      attendance: [
        {
          date: "2023/05/01",
          attend: true,
        },
        {
          date: "2023/05/02",
          attend: false,
        },
      ],
    });
    expect(guest.serialize()).toStrictEqual({
      attendance: [
        {
          attend: true,
          date: "2023/05/01",
        },
        {
          attend: false,
          date: "2023/05/02",
        },
      ],
      name: "ゲスト",
      number: 1,
    });
  });
});

describe("回答が存在するか", () => {
  const guest = EventGuest.new({
    number: 2,
    name: "ゲスト",
    attendance: [
      {
        date: "2023/05/01",
        attend: true,
      },
      {
        date: "2023/05/02",
        attend: false,
      },
      {
        date: "2023/05/03",
        attend: false,
      },
      {
        date: "2023/05/04",
        attend: true,
      },
    ],
  });
  it("回答が存在し出席である", () => {
    expect(guest.isAttendOrUndefined(new Date("2023/05/04"))).toBe(true);
    expect(guest.isAttendOrUndefined(new Date("2023/05/01"))).toBe(true);
  });
  it("回答が存在し欠席である", () => {
    expect(guest.isAttendOrUndefined(new Date("2023/05/02"))).toBe(false);
    expect(guest.isAttendOrUndefined(new Date("2023/05/03"))).toBe(false);
  });
  it("回答が存在しない", () => {
    expect(guest.isAttendOrUndefined(new Date("2022/05/02"))).toBe(undefined);
    expect(guest.isAttendOrUndefined(new Date("2023/04/01"))).toBe(undefined);
  });
});
