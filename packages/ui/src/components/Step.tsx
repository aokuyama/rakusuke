import { FC } from "react";
import { css } from "@emotion/react";
import { boxLayout } from "../styles/layout";

type Props = {
  children: React.ReactNode;
};

export const Step: FC<Props> = ({ children }) => {
  return <section css={styles}>{children}</section>;
};

const styles = css`
  display: flex;
  ${boxLayout.default}
`;
