export * from "./interactor";

export type CreateEventInput = {
  name: string;
  dates: string[];
};

export type CreateEventOutput = {
  path: string;
};

export interface CreateEventUsecase {
  handle: (input: CreateEventInput) => Promise<void>;
}

export interface CreateEventPresenter {
  render: (output: CreateEventOutput) => Promise<void>;
}