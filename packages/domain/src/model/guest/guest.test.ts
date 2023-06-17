import { NewGuest } from "./guest";
import { Date } from "../date";
import { GuestNumber } from "./number";
const number = new GuestNumber(1);
describe("ゲスト", () => {
  it("正しく生成できる", () => {
    const guest = NewGuest.new({
      number: number,
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
      memo: undefined,
    });
  });

  it("名前がない場合失敗する", () => {
    expect(() => {
      NewGuest.new({
        number: number,
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
      NewGuest.new({
        number: number,
        name: "guest",
        attendance: [],
      });
    }).toThrow("at least one answer is required");
  });
});

describe("回答が存在するか", () => {
  const guest = NewGuest.new({
    number: number,
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
  const guest = NewGuest.new({
    number: number,
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
