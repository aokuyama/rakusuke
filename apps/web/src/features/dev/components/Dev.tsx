import { FC, useContext } from "react";
import { User } from "domain/src/model/user";
import { UserData } from "./UserData";
import { loadingContext } from "@/hooks/useLoading";

interface Props {
  user: User;
}

export const Dev: FC<Props> = ({ user }) => {
  const ctx = useContext(loadingContext);

  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <>
          {ctx.loading ? <div>loading...</div> : <></>}
          <UserData user={user} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
