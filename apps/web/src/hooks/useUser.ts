import { storage } from "@/registry";
import { RegisteredUser, User } from "domain/src/model/user";
import { createContext, useCallback, useEffect, useState } from "react";

type UserContext = {
  user: User | undefined;
  setUser: (user: RegisteredUser) => void;
};

const defaultContext: UserContext = {
  user: undefined,
  setUser: (user: RegisteredUser) => {
    return;
  },
};

export const userContext = createContext<UserContext>(defaultContext);

export const useUser = (): UserContext => {
  const [user, setUserBase] = useState<User>();

  const setUser = useCallback((user: RegisteredUser): void => {
    setUserBase(user);
    storage.saveUser(user);
  }, []);

  useEffect(() => {
    const user = storage.getUser();
    setUserBase(user);
  }, [setUser]);

  return { user, setUser };
};
