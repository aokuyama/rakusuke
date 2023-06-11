import { ExistingEvent } from "domain/src/model/event";

export * from "./interactor";

export type ResetEventDateInput = {
  userId: number;
  path: string;
};

export type ResetEventDateOutput = {
  event: ExistingEvent;
};

export interface ResetEventDateUsecase {
  handle: (input: ResetEventDateInput) => Promise<void>;
}

export interface ResetEventDatePresenter {
  render: (output: ResetEventDateOutput) => Promise<void>;
}
