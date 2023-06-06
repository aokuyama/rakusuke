import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  children: React.ReactNode;
};

export const Name: FC<Props> = ({ children }) => {
  return <p css={styles}>{children}</p>;
};

const styles = css`
  margin: 0 0 8px;
`;
