import { FC } from "react";
import { User } from "domain/src/model/user";

interface Props {
  user: User;
}

export const UserData: FC<Props> = ({ user }) => {
  if (process.env.NODE_ENV !== "development") {
    return <></>;
  }
  if (!user.getRawToken()) {
    return <div>guest user.</div>;
  }
  return <div>user: {user.getRawToken()}</div>;
};
