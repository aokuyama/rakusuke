import { FC } from "react";
import { User } from "domain/src/model/user";

interface Props {
  user: User;
}

export const UserData: FC<Props> = ({ user }) => {
  return <div suppressHydrationWarning={true}>user: {user.getDebugInfo()}</div>;
};
