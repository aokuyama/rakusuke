import { FC } from "react";
import { css } from "@emotion/react";
import { black, colorSet, white } from "../../styles/color";

type Props = {
  title?: string;
};

export const Footer: FC<Props> = ({ title }) => {
  return (
    <footer css={style}>
      <p>@ 2023 {title} All rights reserved.</p>
    </footer>
  );
};

const style = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 16px 16px;
  color: ${white.default};
  background-color: ${black.default};

  p {
    margin: 0;
    font-weight: 200;
    font-size: 0.8em;
  }
`;
