import { ExistingEvent } from "domain/src/model/event";

export * from "./interactor";

export type CreateEventInput = {
  organizerId: number;
  name: string;
  description: string | undefined;
  dates: string[];
};

export type CreateEventOutput = {
  event: ExistingEvent;
};

export interface CreateEventUsecase {
  handle: (input: CreateEventInput) => Promise<void>;
}

export interface CreateEventPresenter {
  render: (output: CreateEventOutput) => Promise<void>;
}
