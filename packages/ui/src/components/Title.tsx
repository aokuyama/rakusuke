import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  children: React.ReactNode;
};

const title = css`
  font-style: bold;
  font-size: 2rem;
  margin: 0 auto;
  display: block;
`;

export const Title: FC<Props> = ({ children }) => {
  return <h2 css={title}>{children}</h2>;
};
