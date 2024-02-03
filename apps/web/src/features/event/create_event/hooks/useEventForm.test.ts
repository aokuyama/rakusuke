import { Date } from "domain/src/model/date";
import { useEventForm } from "./useEventForm";
import { renderHook, act } from "@testing-library/react";

describe("日付ピックアップ", () => {
  let result = renderHook(() => useEventForm()).result;
  beforeEach(() => {
    result = renderHook(() => useEventForm()).result;
    act(() => {
      result.current.setDateHandler(new Date("2023/04/15"));
      result.current.setDateHandler(new Date("2023/04/16"));
    });
  });

  it("同じ日付のスケジュールは消える", () => {
    act(() => {
      result.current.setDateHandler(new Date("2023/04/15"));
    });
    expect(result.current.dateList.map((d) => d.toString())).toEqual([
      "2023/04/16",
    ]);
  });

  it("日付順にソートされる", () => {
    act(() => {
      result.current.setDateHandler(new Date("2023/04/14"));
    });
    expect(result.current.dateList.map((d) => d.toString())).toEqual([
      "2023/04/14",
      "2023/04/15",
      "2023/04/16",
    ]);
  });
});
