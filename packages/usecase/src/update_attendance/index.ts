import { EventGuest } from "domain/src/model/guest";

export * from "./interactor";

export type UpdateAttendanceInput = {
  eventPath: string;
  number: number;
  name: string;
  memo: string | undefined;
  attendance: { date: string; attend: boolean }[];
};

export type UpdateAttendanceOutput = {
  guest: EventGuest;
};

export interface UpdateAttendanceUsecase {
  handle: (input: UpdateAttendanceInput) => Promise<void>;
}

export interface UpdateAttendancePresenter {
  render: (output: UpdateAttendanceOutput) => Promise<void>;
}
