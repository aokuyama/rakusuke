import { ClassAttributes, FC, InputHTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
import { Toggle } from "./Toggle";

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
  color?: string;
};

export const ToggleListItem: FC<Props> = ({ name, color, children }) => {
  return (
    <li css={styles}>
      <div
        css={css`
          color: ${color};
        `}
      >
        {name}
      </div>
      <Toggle>{children}</Toggle>
    </li>
  );
};

const styles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 10px;
  padding: 0 4px;
  margin: 8px 0;
  width: 50%;
  div {
    width: 40%;
  }
  label {
    width: 60%;
  }
`;
