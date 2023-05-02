import { Guest } from "./guest";
import { Date } from "../event/date";

describe("ゲスト", () => {
  it("正しく生成できる", () => {
    const guest = Guest.create({
      eventPath: "12345678901234567890123456789012",
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
      eventPath: "12345678901234567890123456789012",
      name: "ゲスト",
    });
  });

  it("名前がない場合失敗する", () => {
    expect(() => {
      Guest.create({
        eventPath: "12345678901234567890123456789012",
        name: "",
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
    }).toThrow("guest must have a name");
  });

  it("回答がひとつもない場合失敗する", () => {
    expect(() => {
      Guest.create({
        eventPath: "12345678901234567890123456789012",
        name: "guest",
        attendance: [],
      });
    }).toThrow("at least one answer is required");
  });

  it("イベント指定が不正な場合失敗する", () => {
    expect(() => {
      Guest.create({
        eventPath: "123456789012345678901234567890123",
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
    }).toThrow("path must be 32 characters");
    expect(() => {
      Guest.create({
        eventPath: "",
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
    }).toThrow("path must be 32 characters");
  });
});

describe("回答が存在するか", () => {
  const guest = Guest.create({
    eventPath: "12345678901234567890123456789012",
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
  it("回答が存在する", () => {
    expect(guest.isAnswering(new Date("2023/05/02"))).toBe(true);
    expect(guest.isAnswering(new Date("2023/05/01"))).toBe(true);
  });
  it("回答が存在しない", () => {
    expect(guest.isAnswering(new Date("2022/05/02"))).toBe(false);
    expect(guest.isAnswering(new Date("2023/04/01"))).toBe(false);
  });
});

describe("回答を取得", () => {
  const guest = Guest.create({
    eventPath: "12345678901234567890123456789012",
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
        attend: true,
      },
    ],
  });
  it("出欠を取得", () => {
    expect(guest.isAttend(new Date("2023/05/01"))).toBe(true);
    expect(guest.isAttend(new Date("2023/05/02"))).toBe(false);
    expect(guest.isAttend(new Date("2023/05/03"))).toBe(true);
  });
  it("存在しない回答を聞くとエラーになる", () => {
    expect(() => {
      guest.isAttend(new Date("2022/05/01"));
    }).toThrow("not found date: 2022/05/01");
    expect(() => {
      guest.isAttend(new Date("2023/06/02"));
    }).toThrow("not found date: 2023/06/02");
  });
});
