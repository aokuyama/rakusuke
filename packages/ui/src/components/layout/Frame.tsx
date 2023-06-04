import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { backgroundColor } from "../../styles/color";
import { isNotSmall } from "../../styles/layout";

type Props = {
  children: ReactNode;
};

export const Frame: FC<Props> = ({ children }) => {
  return <div css={styles}>{children}</div>;
};

const styles = css`
  display: grid;
  ${isNotSmall} {
    grid-template-rows: 1fr;
    grid-template-columns: 340px 1fr 340px;
  }
  padding: 16px 0;
  ${backgroundColor.background}
`;
