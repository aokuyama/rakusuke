import { UserID } from "../user";
import { NewEvent } from "./new_event";

const organizerId = new UserID(1);

describe("イベント作成", () => {
  it("イベントが正しく作成できる", () => {
    const event = NewEvent.create({
      organizerId: organizerId,
      name: "EventName",
      dates: ["2023/04/15"],
      today: "2023/04/15",
    });
    expect(event.name).toBe("EventName");
    expect(event.path.length).toBe(16);
  });

  it("日付が空の場合失敗する", () => {
    expect(() => {
      NewEvent.create({
        organizerId: organizerId,
        name: "event",
        dates: [],
        today: "2023/04/15",
      });
    }).toThrow("at least one date is required");
  });

  it("日付が20を超える場合失敗する", () => {
    expect(() => {
      NewEvent.create({
        organizerId: organizerId,
        name: "20の日付",
        dates: [
          "2023/04/15",
          "2023/04/16",
          "2023/04/17",
          "2023/04/18",
          "2023/04/19",
          "2023/04/20",
          "2023/04/21",
          "2023/04/22",
          "2023/04/23",
          "2023/04/24",
          "2023/04/25",
          "2023/04/26",
          "2023/04/27",
          "2023/04/28",
          "2023/04/29",
          "2023/04/30",
          "2023/05/01",
          "2023/05/02",
          "2023/05/03",
          "2023/05/04",
        ],
        today: "2023/04/15",
      });
    }).toBeTruthy();
    expect(() => {
      NewEvent.create({
        organizerId: organizerId,
        name: "21の日付",
        dates: [
          "2023/04/14",
          "2023/04/15",
          "2023/04/16",
          "2023/04/17",
          "2023/04/18",
          "2023/04/19",
          "2023/04/20",
          "2023/04/21",
          "2023/04/22",
          "2023/04/23",
          "2023/04/24",
          "2023/04/25",
          "2023/04/26",
          "2023/04/27",
          "2023/04/28",
          "2023/04/29",
          "2023/04/30",
          "2023/05/01",
          "2023/05/02",
          "2023/05/03",
          "2023/05/04",
        ],
        today: "2023/04/15",
      });
    }).toThrow("dates must be 20 num or less");
  });

  it("日付に重複があると失敗する", () => {
    expect(() => {
      NewEvent.create({
        organizerId: organizerId,
        name: "event",
        dates: ["2023/04/15", "2023/04/15"],
        today: "2023/04/14",
      });
    }).toThrow("duplicate date");
  });
  it("31日より先の日付があると失敗する", () => {
    NewEvent.create({
      organizerId: organizerId,
      name: "event",
      today: "2023/03/15",
      dates: ["2023/04/15"],
    });
    expect(() => {
      NewEvent.create({
        organizerId: organizerId,
        name: "event",
        today: "2023/03/15",
        dates: ["2023/04/16"],
      });
    }).toThrow("too early to schedule");
  });
});
