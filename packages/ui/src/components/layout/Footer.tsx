import { FC } from "react";
import { css } from "@emotion/react";
import { mainColor, white } from "../../styles/color";

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
  padding: 25px 10px 10px;
  background-color: ${mainColor.default};

  p {
    margin: 0;
    color: ${white.default};
    font-weight: 200;
    font-size: 0.8em;
  }
`;
