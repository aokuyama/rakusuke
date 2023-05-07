import { css } from "@emotion/react";
import { FC } from "react";
import { mainColor, white } from "../../styles/color";

type Props = {
  title: string;
  slogan: string;
};

export const Header: FC<Props> = ({ title, slogan }) => {
  return (
    <header css={style}>
      <h1>
        <a href="/">{title}</a>
      </h1>
      <p>{slogan}</p>
    </header>
  );
};

const style = css`
  background-color: ${mainColor.default};
  padding: 8px 0;
  h1,
  p {
    text-align: center;
    display: block;
    margin: 12px auto;
  }
  h1 {
    color: ${white.default};
    font-family: RocknRoll One;
    font-size: 64px;
    width: 300px;
  }
  p {
    color: ${white.lighter};
    font-family: Unica One;
    width: 300px;
  }
`;
