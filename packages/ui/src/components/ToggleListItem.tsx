import { ClassAttributes, FC, InputHTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
import { Toggle } from "./Toggle";
import { backgroundColor, mainColor } from "../styles/color";

export type Item = {
  id: string;
  name: string;
  checked: boolean;
};

type Props = {
  name: string;
  children: ReactNode &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>;
};

export const ToggleListItem: FC<Props> = ({ name, children }) => {
  return (
    <li css={styles}>
      <div>{name}</div>
      <Toggle>{children}</Toggle>
    </li>
  );
};

const styles = css`
  display: flex;
  align-items: center;
  gap: 0 10px;
  padding: 0.3em;
  ::before {
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
