import { FC } from "react";
import { css } from "@emotion/react";
import { boxSize } from "../styles/size";

type Props = {
  children: React.ReactNode;
};

const title = css`
  font-style: bold;
  margin: 0 auto;
  display: inline-block;
  width: ${boxSize.default - 32}px;
`;

export const Title: FC<Props> = ({ children }) => {
  return <h2 css={title}>{children}</h2>;
};
