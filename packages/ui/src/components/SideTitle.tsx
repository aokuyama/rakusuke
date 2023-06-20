import { FC } from "react";
import { css } from "@emotion/react";
import { boxLayout } from "../styles/layout";

type Props = {
  children: React.ReactNode;
};

export const SideTitle: FC<Props> = ({ children }) => {
  return <h3 css={styles}>{children}</h3>;
};

const styles = css`
  font-weight: 800;
  height: 36px;
  line-height: 36px;
  display: block;
  text-align: center;
  ${boxLayout.default}
`;
