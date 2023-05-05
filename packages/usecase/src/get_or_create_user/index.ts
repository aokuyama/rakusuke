import { User } from "domain/src/model/user";
export * from "./interactor";

export type GetOrCreateUserInput = {
  token: string | null;
};

export type GetOrCreateUserOutput = {
  user: User | null;
};

export interface GetOrCreateUserUsecase {
  handle: (input: GetOrCreateUserInput) => Promise<void>;
}

export interface GetOrCreateUserPresenter {
  render: (output: GetOrCreateUserOutput) => Promise<void>;
}
