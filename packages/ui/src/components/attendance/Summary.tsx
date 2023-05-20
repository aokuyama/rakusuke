import { FC } from "react";
import { textColor } from "../../styles/color";
import { css } from "@emotion/react";

export type Item = { id: string | number; name: string; length: number };

type Props = {
  summary: Item[];
};

export const Summary: FC<Props> = ({ summary }) => {
  return (
    <ul css={listStyles}>
      {summary.map((item) => {
        return (
          <li key={item.id} data-length={item.length}>
            <span>{item.name}</span>
            <span>{item.length}人</span>
          </li>
        );
      })}
    </ul>
  );
};

const listStyles = css`
  ${textColor.default};
  display: flex;
  flex-wrap: wrap;
  li {
    width: 33%;
    display: inline-block;
    align-items: center;
    text-align: center;
  }
  li[data-length="0"] {
    ${textColor.disabled};
  }
`;
