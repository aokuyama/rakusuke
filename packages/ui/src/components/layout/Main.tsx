import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { backgroundColor } from "../../styles/color";

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return <main css={styles}>{children}</main>;
};

const styles = css`
  padding-top: 16px;
  ${backgroundColor.background}
`;
