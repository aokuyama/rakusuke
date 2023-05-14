import { UserEntity } from "domain/src/model/user";
export * from "./interactor";

export type GetOrCreateUserInput = {
  user: {
    uuid: string;
    token: string;
  } | null;
};

export type GetOrCreateUserOutput = {
  user: UserEntity | null;
};

export interface GetOrCreateUserUsecase {
  handle: (input: GetOrCreateUserInput) => Promise<void>;
}

export interface GetOrCreateUserPresenter {
  render: (output: GetOrCreateUserOutput) => Promise<void>;
}
