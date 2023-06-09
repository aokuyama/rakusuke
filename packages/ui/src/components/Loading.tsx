import { FC } from "react";
import { css } from "@emotion/react";
import { Spinner } from "./Spinner";
import { headerHeight } from "./layout/Header";
import { footerHeight } from "./layout/Footer";

export const Loading: FC = () => {
  return (
    <div css={styles}>
      <Spinner />
    </div>
  );
};

const styles = css`
  height: calc(100vh - ${headerHeight} - ${footerHeight});
  display: flex;
  justify-content: center;
  align-items: center;
`;
