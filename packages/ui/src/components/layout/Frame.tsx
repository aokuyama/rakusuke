import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { backgroundColor } from "../../styles/color";
import { isNotSmall } from "../../styles/layout";

type Props = {
  children: ReactNode;
};

export const Frame: FC<Props> = ({ children }) => {
  return (
    <div css={styles}>
      <div>{children}</div>
    </div>
  );
};

const styles = css`
  ${backgroundColor.background}
  > div {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    ${isNotSmall} {
      grid-template-rows: 1fr;
      grid-template-columns: 340px 1fr 340px;
    }
    padding: 16px 0;
  }
`;
