import { ClassAttributes, FC, InputHTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";

type Props = {
  children: ReactNode &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>;
  label?: string;
};

export const TextBox: FC<Props> = ({ children, label }) => {
  return (
    <label css={styles}>
      <span css={labelStyle}>{label}</span>
      {children}
    </label>
  );
};

const styles = css`
  display: block;
  width: 480px;
  max-width: 100%;
  margin: 0 auto 16px;
  input {
    ${backgroundColor.default};
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #969da3;
    border-radius: 3px;
    font-size: 1em;
    line-height: 1.5;
    color: #333;
    ::placeholder {
      color: #999;
    }
    @media (prefers-color-scheme: dark) {
      color: #ccc;
      ::placeholder {
        color: #666;
      }
    }
  }
`;

const labelStyle = css`
  color: #333;
  @media (prefers-color-scheme: dark) {
    color: #ccc;
  }
  display: block;
  margin-bottom: 5px;
  font-size: 0.9em;
`;
