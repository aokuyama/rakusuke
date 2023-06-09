import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { isNotSmall } from "../../styles/layout";
import { boxSize } from "../../styles/size";

type Props = {
  children: ReactNode;
};

export const Aside: FC<Props> = ({ children }) => {
  return <aside css={styles}>{children}</aside>;
};

const styles = css`
  margin: 0 auto;
  ${isNotSmall} {
    grid-row: 1 / 1;
    grid-column: 2 / 3;
    width: ${boxSize.side}px;
  }
`;
