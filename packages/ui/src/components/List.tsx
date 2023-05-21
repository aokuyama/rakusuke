import { FC } from "react";
import { css } from "@emotion/react";
import { backgroundColor, mainColor } from "../styles/color";
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
  padding: 1em;
  border-radius: 3px;
  ${backgroundColor.default};
  ${boxLayout.default}

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
