import {
  UserToken,
  User,
  unregisteredUser,
  RegisteredUser,
} from "../../model/user";

export const tokenToUser = (token: UserToken | null): User =>
  token ? new RegisteredUser({ token: token }) : unregisteredUser;
