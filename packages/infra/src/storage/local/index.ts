import { UserToken, User } from "domain/src/model/user";
import { tokenToUser } from "domain/src/service/user";

export class LocalStorage {
  getUser = (): User => tokenToUser(this.getUserToken());
  private getUserToken = (): UserToken | null => {
    if (typeof window === "undefined") {
      return null;
    }
    const token = localStorage.getItem("user");
    return token ? new UserToken(token) : null;
  };
  saveUserToken = (token: UserToken) => {
    localStorage.setItem("user", token.rawValue());
  };
}
