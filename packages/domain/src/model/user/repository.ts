import { UserEntity } from ".";
import { UserToken, NewUserToken } from "./token";
import { UUID, NewUUID } from "../uuid";

export interface UserRepository {
  createByUUIDAndToken: (
    uuid: NewUUID,
    token: NewUserToken
  ) => Promise<UserEntity>;
  getByUUIDAndToken: (
    uuid: UUID,
    token: UserToken
  ) => Promise<UserEntity | null>;
}
