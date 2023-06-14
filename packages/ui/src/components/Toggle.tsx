import { ClassAttributes, FC, InputHTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
import { systemColor } from "../styles/color";

type Props = {
  children: ReactNode &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>;
};

export const Toggle: FC<Props> = ({ children }) => {
  return <label css={styles}>{children}</label>;
};

const styles = css`
  display: inline-block;
  position: relative;
  display: inline-block;
  width: 66px;
  height: 30px;
  border-radius: 50px;
  background-color: #ddd;
  cursor: pointer;
  transition: background-color 0.2s;

  :has(:checked) {
    background-color: ${systemColor.checked};
  }

  ::after {
    position: absolute;
    top: -1px;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
    background-color: #fff;
    content: "";
    transition: left 0.2s;
  }

  :has(:checked)::after {
    left: calc(100% - 32px);
  }

  input {
    display: none;
  }
`;
