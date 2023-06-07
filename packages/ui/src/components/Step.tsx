import { FC } from "react";
import { css } from "@emotion/react";
import { boxLayout } from "../styles/layout";

type Props = {
  number?: number;
  children: React.ReactNode;
};

export const Step: FC<Props> = ({ number, children }) => {
  return (
    <p css={styles}>
      {number && <span>{number}.</span>}
      {children}
    </p>
  );
};

const styles = css`
  display: flex;
  ${boxLayout.default}
  span {
    margin-right: 6px;
  }
`;
