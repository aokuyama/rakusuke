import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { screenSize } from "../../styles/layout";
import { boxSize } from "../../styles/size";

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return <main css={styles}>{children}</main>;
};

const styles = css`
  margin: 0 auto;
  padding: 0.1px 0 0.1px;
  ${screenSize.isSmall} {
    width: ${boxSize.default}px;
  }
  ${screenSize.isNotSmall} {
    display: grid;
    justify-content: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 320px;
  }
  ${screenSize.isWide} {
    grid-template-columns: 320px 1fr 320px;
  }
`;
