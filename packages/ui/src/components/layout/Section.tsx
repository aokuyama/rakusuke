import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { isWide } from "../../styles/layout";
import { boxSize } from "../../styles/size";

type Props = {
  children: ReactNode;
};

export const SectionL: FC<Props> = ({ children }) => {
  return <section css={stylesL}>{children}</section>;
};

const stylesL = css`
  margin: 0 auto;
  ${isWide} {
    grid-row: 1 / 1;
    grid-column: 1 / 2;
    width: ${boxSize.side}px;
  }
`;

export const SectionR: FC<Props> = ({ children }) => {
  return <section css={stylesR}>{children}</section>;
};

const stylesR = css`
  margin: 0 auto;
  ${isWide} {
    grid-row: 1 / 1;
    grid-column: 2 / 3;
  }
`;
