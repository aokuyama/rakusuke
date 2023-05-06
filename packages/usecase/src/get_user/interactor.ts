import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type { GetUserInput, GetUserPresenter, GetUserUsecase } from ".";
import { UserRepository } from "domain/src/model/user";
import { UserToken } from "domain/src/model/user/token";

@injectable()
export class GetUserInteractor implements GetUserUsecase {
  constructor(
    @inject("GetUserPresenter")
    private readonly presenter: GetUserPresenter,
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  handle = async (input: GetUserInput) => {
    const user = await this.repository.getUserByToken(
      new UserToken(input.token)
    );
    await this.presenter.render({ user: user });
  };
}
