import { FC } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";
import { boxLayout } from "../styles/layout";

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
  display: flex;
  flex-wrap: wrap;
  :has(li) {
    padding: 16px 0;
  }
  border-radius: 3px;
  text-align: center;
  ${backgroundColor.default};
  ${boxLayout.default}
  li {
    padding: 5px;
    width: 33%;
  }
`;
