import { Event } from "domain/src/model/event";

export * from "./interactor";

export type GetEventByPathInput = {
  path: string;
};

export type GetEventByPathOutput = {
  event: Event | null;
};

export interface GetEventByPathUsecase {
  handle: (input: GetEventByPathInput) => Promise<void>;
}

export interface GetEventByPathPresenter {
  render: (output: GetEventByPathOutput) => Promise<void>;
}
