import { UserEntity } from ".";
import { UserToken, NewUserToken } from "./token";

export interface UserRepository {
  createUserByToken: (token: NewUserToken) => Promise<UserEntity>;
  getUserByToken: (token: UserToken) => Promise<UserEntity | null>;
}
