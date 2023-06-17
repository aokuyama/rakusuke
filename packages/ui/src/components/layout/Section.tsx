import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { screenSize } from "../../styles/layout";
import { boxSize } from "../../styles/size";

type Props = {
  children: ReactNode;
};

export const SectionLeft: FC<Props> = ({ children }) => {
  return <section css={stylesLeft}>{children}</section>;
};
export const SectionMain: FC<Props> = ({ children }) => {
  return <section css={stylesMain}>{children}</section>;
};
export const SectionRight: FC<Props> = ({ children }) => {
  return <aside css={stylesRight}>{children}</aside>;
};

const stylesLeft = css`
  margin: 16px auto 0;
  width: ${boxSize.default}px;
  ${screenSize.isNotSmall} {
    grid-column: 1 / 2;
  }
  ${screenSize.isWide} {
    width: ${boxSize.side}px;
  }
`;

const stylesMain = css`
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

const stylesRight = css`
  margin: 0 auto;
  width: ${boxSize.default}px;
  ${screenSize.isNotSmall} {
    margin-top: 16px;
    grid-row: 1 / 1;
    grid-column: 2 / 3;
    width: ${boxSize.side}px;
  }
  ${screenSize.isWide} {
    grid-column: 3 / 4;
  }
`;
