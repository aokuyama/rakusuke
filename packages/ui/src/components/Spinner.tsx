import { FC } from "react";
import { mainColor } from "../styles/color";
import { css } from "@emotion/react";

export const Spinner: FC = () => {
  return (
    <div css={styles}>
      <div />
    </div>
  );
};

const styles = css`
  width: 64px;
  height: 64px;
  margin: 0 auto;
  div {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 5px solid ${mainColor.default};
    border-top-color: ${mainColor.lighter};
    animation: spinner 1.6s linear infinite;
    to {
      transform: rotate(360deg);
    }
  }
`;
