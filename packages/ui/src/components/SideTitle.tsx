import { FC } from "react";
import { css } from "@emotion/react";
import { boxLayout } from "../styles/layout";

type Props = {
  children: React.ReactNode;
};

export const SideTitle: FC<Props> = ({ children }) => {
  return <p css={styles}>{children}</p>;
};

const styles = css`
  display: block;
  text-align: center;
  ${boxLayout.side}
`;
