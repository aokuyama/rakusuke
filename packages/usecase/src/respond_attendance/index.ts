import { UpcomingEvent } from "domain/src/model/event";

export * from "./interactor";

export type RespondAttendanceInput = {
  eventPath: string;
  name: string;
  attendance: { date: string; attend: boolean }[];
};

export type RespondAttendanceOutput = {
  id: number;
};

export interface RespondAttendanceUsecase {
  handle: (input: RespondAttendanceInput) => Promise<void>;
}

export interface RespondAttendancePresenter {
  render: (output: RespondAttendanceOutput) => Promise<void>;
}
