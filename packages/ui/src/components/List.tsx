import { FC } from "react";
import { css } from "@emotion/react";
import { mainColor } from "../styles/color";

export type Item = { id: string | number; name: string };

type Props = {
  items: Item[];
};

export const List: FC<Props> = ({ items }) => {
  return (
    <ul css={list}>
      {items.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );
};

const list = css`
  list-style-type: none;
  padding: 1em;
  border: 2px solid ${mainColor.brighter};

  li {
    display: flex;
    align-items: center;
    gap: 0 10px;
    padding: 0.3em;
  }

  li::before {
    transform: rotate(-45deg);
    width: 0.4em;
    height: 0.4em;
    border-bottom: 3px solid ${mainColor.default};
    border-right: 3px solid ${mainColor.default};
    content: "";
  }
`;
