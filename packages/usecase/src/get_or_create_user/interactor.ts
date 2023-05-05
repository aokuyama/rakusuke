import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  GetOrCreateUserInput,
  GetOrCreateUserPresenter,
  GetOrCreateUserUsecase,
} from ".";
import { UserEntity, UserRepository } from "domain/src/model/user";
import { NewUserToken, UserToken } from "domain/src/model/user/token";

@injectable()
export class GetOrCreateUserInteractor implements GetOrCreateUserUsecase {
  constructor(
    @inject("GetOrCreateUserPresenter")
    private readonly presenter: GetOrCreateUserPresenter,
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  handle = async (input: GetOrCreateUserInput) => {
    const user = input.token
      ? await this.getUser(input.token)
      : await this.createUser();

    await this.presenter.render({ user: user });
  };
  private getUser = async (token: string): Promise<UserEntity | null> =>
    await this.repository.getUserByToken(new UserToken(token));
  private createUser = async (): Promise<UserEntity> =>
    await this.repository.createUserByToken(NewUserToken.create());
}
