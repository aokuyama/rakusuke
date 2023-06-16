import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { screenSize } from "../../styles/layout";
import { boxSize } from "../../styles/size";

type Props = {
  children: ReactNode;
};

export const SectionL: FC<Props> = ({ children }) => {
  return <section css={stylesL}>{children}</section>;
};

const stylesL = css`
  margin: 16px auto 0;
  width: ${boxSize.default}px;
  ${screenSize.isNotSmall} {
    grid-column: 1 / 2;
  }
  ${screenSize.isWide} {
    width: ${boxSize.side}px;
  }
`;

export const SectionR: FC<Props> = ({ children }) => {
  return <section css={stylesR}>{children}</section>;
};

const stylesR = css`
  margin: 16px auto 0;
  width: ${boxSize.default}px;
  ${screenSize.isNotSmall} {
    grid-column: 1 / 2;
  }
  ${screenSize.isMiddle} {
    width: ${boxSize.middle}px;
  }
  ${screenSize.isWide} {
    grid-row: 1 / 1;
    grid-column: 2 / 3;
  }
`;
