import { UserEntity } from "domain/src/model/user";
export * from "./interactor";

export type GetUserInput = {
  uuid: string;
  token: string;
};

export type GetUserOutput = {
  user: UserEntity | null;
};

export interface GetUserUsecase {
  handle: (input: GetUserInput) => Promise<void>;
}

export interface GetUserPresenter {
  render: (output: GetUserOutput) => Promise<void>;
}
