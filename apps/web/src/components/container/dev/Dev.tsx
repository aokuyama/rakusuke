import { FC } from "react";
import { User } from "domain/src/model/user";
import { UserData } from "./UserData";

interface Props {
  user: User;
}

export const Dev: FC<Props> = ({ user }) => {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <UserData user={user} />
      ) : (
        <></>
      )}
    </>
  );
};
