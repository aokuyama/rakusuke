export * from "./interactor";

export type UpdateAttendanceInput = {
  eventPath: string;
  number: number;
  name: string;
  attendance: { date: string; attend: boolean }[];
};

export type UpdateAttendanceOutput = {
  number: number;
  name: string;
  attendance: { date: string; attend: boolean }[];
};

export interface UpdateAttendanceUsecase {
  handle: (input: UpdateAttendanceInput) => Promise<void>;
}

export interface UpdateAttendancePresenter {
  render: (output: UpdateAttendanceOutput) => Promise<void>;
}
