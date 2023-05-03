export * from "./interactor";

export type RespondAttendanceInput = {
  eventPath: string;
  name: string;
  attendance: { date: string; attend: boolean }[];
};

export type RespondAttendanceOutput = {
  number: number;
  name: string;
  attendance: { date: string; attend: boolean }[];
};

export interface RespondAttendanceUsecase {
  handle: (input: RespondAttendanceInput) => Promise<void>;
}

export interface RespondAttendancePresenter {
  render: (output: RespondAttendanceOutput) => Promise<void>;
}
