import { ExistingEvent } from "domain/src/model/event";

export * from "./interactor";

export type DecideOnEventDateInput = {
  userId: number;
  path: string;
  date: string;
};

export type DecideOnEventDateOutput = {
  event: ExistingEvent;
};

export interface DecideOnEventDateUsecase {
  handle: (input: DecideOnEventDateInput) => Promise<void>;
}

export interface DecideOnEventDatePresenter {
  render: (output: DecideOnEventDateOutput) => Promise<void>;
}
