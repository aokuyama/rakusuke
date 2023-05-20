import { FC } from "react";
import { css } from "@emotion/react";
import { systemColor } from "../styles/color";

type Props = {
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Toggle: FC<Props> = ({ name, value, checked, onChange }) => {
  return (
    <label css={styles}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

const styles = css`
  display: inline-block;
  position: relative;
  width: 60px;
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
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
    background-color: #fff;
    content: "";
    transition: left 0.2s;
  }

  :has(:checked)::after {
    left: 50%;
  }

  input {
    display: none;
  }
`;
