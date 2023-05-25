import { css } from "@emotion/react";
import { FC } from "react";
import { colorSet, mainText } from "../../styles/color";

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
  padding: 8px 0;
  ${colorSet.main}
  h1,
  p {
    text-align: center;
    display: block;
    margin: 12px auto;
  }
  h1 {
    font-family: RocknRollOne;
    font-size: 64px;
    width: 300px;
  }
  p {
    color: ${mainText.lighter};
    width: 300px;
  }
`;
