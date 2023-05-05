import { User } from ".";
import { UserToken, NewUserToken } from "./token";

export interface UserRepository {
  createUserByToken: (token: NewUserToken) => Promise<User>;
  getUserByToken: (token: UserToken) => Promise<User | null>;
}
