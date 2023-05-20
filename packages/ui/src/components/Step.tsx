import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  children: React.ReactNode;
};

export const Step: FC<Props> = ({ children }) => {
  return <section css={styles}>{children}</section>;
};

const styles = css`
  display: flex;
  margin: 0 auto 16px;
  max-width: 100%;
  width: 480px;
`;
