import { ExistingEvent } from "domain/src/model/event";

export * from "./interactor";

export type UpdateEventInput = {
  userId: number;
  path: string;
  name: string;
  dates: string[];
};

export type UpdateEventOutput = {
  event: ExistingEvent;
};

export interface UpdateEventUsecase {
  handle: (input: UpdateEventInput) => Promise<void>;
}

export interface UpdateEventPresenter {
  render: (output: UpdateEventOutput) => Promise<void>;
}
