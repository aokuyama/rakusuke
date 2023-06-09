import { EventGuest, EventGuestList } from "./event_guest";
import { Date } from "../date";

const guest1s = {
  number: 1,
  name: "ゲスト1",
  memo: "メモ",
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
};
const guest2s = {
  number: 2,
  name: "ゲスト2",
  memo: undefined,
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
};
const guest3s = {
  number: 3,
  name: "ゲスト3",
  memo: undefined,
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
};

describe("ゲスト", () => {
  it("正しく生成できる", () => {
    const guest = EventGuest.new(guest1s);
    expect(guest.serialize()).toStrictEqual(guest1s);
  });
});

describe("回答が存在するか", () => {
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

describe("ゲストのリスト", () => {
  it("正しく生成できる", () => {
    const guests = EventGuestList.new([guest1s]);
    expect(guests.serialize()).toStrictEqual([guest1s]);
  });
  it("空でも生成できる", () => {
    const guests = EventGuestList.new([]);
    expect(guests.serialize()).toStrictEqual([]);
  });
  it("重複があるとエラーになる", () => {
    expect(() => {
      EventGuestList.new([guest1s, guest1s]);
    }).toThrow("duplicate number");
  });
  it("制限数を超えるとエラーになる", () => {
    const guests = Array.from(Array(31), (v, k) => {
      return { name: "guest" + (k + 1), number: k + 1, attendance: [] };
    });
    expect(() => {
      EventGuestList.new(guests);
    }).toThrow("guest limit over");
  });
});

describe("ゲストを追加できる", () => {
  const guests = EventGuestList.new([guest1s]);
  const guest2 = EventGuest.new(guest2s);
  const addedGuests = guests.push(guest2);
  expect(addedGuests.serialize()).toStrictEqual([guest1s, guest2s]);
  const guest3 = EventGuest.new(guest3s);
  const addedGuests2 = addedGuests.push(guest3);
  expect(addedGuests2.serialize()).toStrictEqual([guest1s, guest2s, guest3s]);
  expect(guests.length()).toBe(1);
  expect(addedGuests.length()).toBe(2);
  it("追加しようとしたゲストに重複があるとエラーになる", () => {
    const guests = EventGuestList.new([guest1s, guest2s]);
    expect(() => {
      guests.push(EventGuest.new(guest1s));
    }).toThrow("duplicate number");
    const guest2New = EventGuest.new({
      attendance: [
        {
          attend: false,
          date: "2023/05/01",
        },
        {
          attend: false,
          date: "2023/05/02",
        },
      ],
      name: "差し替えゲスト2",
      number: 2,
    });
    expect(() => {
      guests.push(guest2New);
    }).toThrow("duplicate number");
  });
  it("制限数を超えるとエラーになる", () => {
    const rows = Array.from(Array(30), (v, k) => {
      return { name: "guest" + (k + 1), number: k + 1, attendance: [] };
    });
    const guests = EventGuestList.new(rows);
    const guestNew = EventGuest.new({
      attendance: [],
      name: "guest32",
      number: 32,
    });
    expect(() => {
      guests.push(guestNew);
    }).toThrow("guest limit over");
  });
});
describe("同じIDのゲストを差し替える", () => {
  const guest2New = EventGuest.new({
    attendance: [
      {
        attend: false,
        date: "2023/05/01",
      },
      {
        attend: false,
        date: "2023/05/02",
      },
    ],
    name: "差し替えゲスト2",
    memo: undefined,
    number: 2,
  });
  const guests = EventGuestList.new([guest1s, guest2s, guest3s]);
  const addedGuests3 = guests.replace(guest2New);
  expect(addedGuests3.serialize()).toStrictEqual([
    guest1s,
    {
      attendance: [
        {
          attend: false,
          date: "2023/05/01",
        },
        {
          attend: false,
          date: "2023/05/02",
        },
      ],
      name: "差し替えゲスト2",
      memo: undefined,
      number: 2,
    },
    guest3s,
  ]);
  const guest1New = EventGuest.new({
    attendance: [
      {
        attend: true,
        date: "2023/05/01",
      },
      {
        attend: true,
        date: "2023/05/02",
      },
    ],
    name: "差し替えゲスト1",
    memo: undefined,
    number: 1,
  });
  const addedGuests4 = addedGuests3.replace(guest1New);
  expect(addedGuests4.serialize()).toStrictEqual([
    {
      attendance: [
        {
          attend: true,
          date: "2023/05/01",
        },
        {
          attend: true,
          date: "2023/05/02",
        },
      ],
      name: "差し替えゲスト1",
      memo: undefined,
      number: 1,
    },
    {
      attendance: [
        {
          attend: false,
          date: "2023/05/01",
        },
        {
          attend: false,
          date: "2023/05/02",
        },
      ],
      name: "差し替えゲスト2",
      memo: undefined,
      number: 2,
    },
    guest3s,
  ]);
  it("差し替えようとしたゲストが存在しないとエラーになる", () => {
    const guests = EventGuestList.new([guest1s, guest3s]);
    expect(() => {
      guests.replace(EventGuest.new(guest2s));
    }).toThrow("guest not found. number: 2");
    const guests2 = EventGuestList.new([]);
    expect(() => {
      guests2.replace(EventGuest.new(guest1s));
    }).toThrow("guest not found. number: 1");
  });
});

describe("ゲストの取得", () => {
  const guests = EventGuestList.new([guest1s, guest3s]);
  it("正しく取得できる", () => {
    expect(guests.getByNumber(3).name).toBe("ゲスト3");
    expect(guests.getByNumber(1).name).toBe("ゲスト1");
  });
  it("取得しようとしたゲストが存在しないとエラーになる", () => {
    expect(() => {
      guests.getByNumber(2);
    }).toThrow("guest not found. number: 2");
    expect(() => {
      guests.getByNumber(4);
    }).toThrow("guest not found. number: 4");
  });
});
