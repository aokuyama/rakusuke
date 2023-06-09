import { FC, useContext } from "react";
import { UserData } from "./UserData";
import { loadingContext } from "@/hooks/useLoading";
import { userContext } from "@/hooks/useUser";

export const Dev: FC = () => {
  const loadingCtx = useContext(loadingContext);
  const userCtx = useContext(userContext);

  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <>
          {loadingCtx.loading ? <div>loading...</div> : <></>}
          {userCtx.user && <UserData user={userCtx.user} />}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
