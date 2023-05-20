import { FC } from "react";
import { css } from "@emotion/react";
import { YesOrNo } from "./YesOrNo";
import { backgroundColor, mainColor } from "../styles/color";

export type Item = {
  id: string;
  name: string;
  checked: boolean;
};

type Props = {
  items: Item[];
  onChangeCallback?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const YesOrNoList: FC<Props> = ({ items, onChangeCallback }) => {
  const onChange = onChangeCallback
    ? (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) {
          return;
        }
        onChangeCallback(e);
      }
    : undefined;
  return (
    <ul css={list}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <div>{item.name}</div>
            <YesOrNo
              name={item.id}
              checked={item.checked}
              onChange={onChange}
            />
          </li>
        );
      })}
    </ul>
  );
};

const list = css`
  list-style-type: none;
  padding: 1em;
  ${backgroundColor.default};
  margin: 0 auto 16px;

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
  div {
    margin: 0 12px;
  }
`;
