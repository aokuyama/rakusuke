import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  GetOrCreateUserInput,
  GetOrCreateUserPresenter,
  GetOrCreateUserUsecase,
} from ".";
import { UserEntity, UserRepository } from "domain/src/model/user";
import { NewUserToken, UserToken } from "domain/src/model/user/token";
import { NewUUID, UUID } from "domain/src/model/uuid";
import { CreateUserEvent } from "domain/src/model/user/domain_event";
import { DomainEventPublisher } from "domain/src/domain_event/publisher";

@injectable()
export class GetOrCreateUserInteractor implements GetOrCreateUserUsecase {
  constructor(
    @inject("DomainEventPublisher")
    private readonly eventPublisher: DomainEventPublisher,
    @inject("GetOrCreateUserPresenter")
    private readonly presenter: GetOrCreateUserPresenter,
    @inject("UserRepository")
    private readonly repository: UserRepository
  ) {}

  handle = async (input: GetOrCreateUserInput) => {
    const user = input.user
      ? await this.getUser(input.user.uuid, input.user.token)
      : await this.createUser();

    await this.presenter.render({ user: user });
  };
  private getUser = async (
    uuid: string,
    token: string
  ): Promise<UserEntity | null> =>
    await this.repository.getByUUIDAndToken(
      new UUID(uuid),
      new UserToken(token)
    );
  private createUser = async (): Promise<UserEntity> => {
    // TODO 天文学的な確率で失敗した時のリトライを入れる
    const user = await this.repository.createByUUIDAndToken(
      NewUUID.create(),
      NewUserToken.create()
    );
    await this.eventPublisher.publish(new CreateUserEvent(user));
    return user;
  };
}
