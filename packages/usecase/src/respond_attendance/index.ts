import { EventGuest } from "domain/src/model/guest";

export * from "./interactor";

export type RespondAttendanceInput = {
  eventPath: string;
  name: string;
  memo: string | undefined;
  attendance: { date: string; attend: boolean }[];
};

export type RespondAttendanceOutput = {
  guest: EventGuest;
};

export interface RespondAttendanceUsecase {
  handle: (input: RespondAttendanceInput) => Promise<void>;
}

export interface RespondAttendancePresenter {
  render: (output: RespondAttendanceOutput) => Promise<void>;
}
