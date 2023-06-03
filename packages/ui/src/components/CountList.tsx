import { FC } from "react";
import { textColor } from "../styles/color";
import { css } from "@emotion/react";

export type Item = { id: string | number; name: string; length: number };

type Props = {
  items: Item[];
  howToCount: string;
};

export const CountList: FC<Props> = ({ items, howToCount }) => {
  return (
    <ul css={listStyles}>
      {items.map((item) => {
        return (
          <li key={item.id} data-length={item.length}>
            <span>{item.name}</span>
            <span>
              {item.length}
              {howToCount}
            </span>
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
    width: 50%;
    display: inline-block;
    align-items: center;
    text-align: center;
    display: flex;
    padding: 0 2px;
    span {
      width: 50%;
    }
  }
  li[data-length="0"] {
    ${textColor.disabled};
  }
`;
