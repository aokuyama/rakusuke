import { FC } from "react";
import { User } from "domain/src/model/user";
import { css } from "@emotion/react";

interface Props {
  user: User;
}

export const UserData: FC<Props> = ({ user }) => {
  return (
    <div css={styles} suppressHydrationWarning={true}>
      user: {user.getDebugInfo()}
    </div>
  );
};

const styles = css`
  word-break: break-all;
`;
