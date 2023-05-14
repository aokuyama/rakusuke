import { unregisteredUser, User, RegisteredUser } from "domain/src/model/user";

export class LocalStorage {
  getUser = (): User => {
    if (typeof window === "undefined") {
      return unregisteredUser;
    }
    const user = localStorage.getItem("user");
    return user ? RegisteredUser.new(JSON.parse(user)) : unregisteredUser;
  };
  saveUser = (user: RegisteredUser) => {
    localStorage.setItem("user", JSON.stringify(user.getAuthInfo()));
  };
}
