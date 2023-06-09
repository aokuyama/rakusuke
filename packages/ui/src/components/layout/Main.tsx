import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { isNotSmall } from "../../styles/layout";

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return <main css={styles}>{children}</main>;
};

const styles = css`
  ${isNotSmall} {
    grid-row: 1 / 1;
    grid-column: 1 / 2;
  }
`;
