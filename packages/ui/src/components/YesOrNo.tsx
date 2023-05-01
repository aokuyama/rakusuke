import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const YesOrNo: FC<Props> = ({ name, value, checked, onChange }) => {
  return (
    <label css={yesOrNo}>
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

const yesOrNo = css`
  display: flex;
  align-items: center;
  position: relative;
  width: 100px;
  height: 50px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #ff8d8d33;
  cursor: pointer;
  transition: background-color 0.4s;

  :has(:checked) {
    background-color: #75bbff33;
  }

  ::before {
    position: absolute;
    left: 5px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ff8d8d;
    content: "";
    transition: left 0.4s;
  }

  :has(:checked)::before {
    left: 50px;
    background-color: #75bbff;
  }

  ::after {
    position: absolute;
    left: 26px;
    transform: translateX(-50%);
    color: #fff;
    font-weight: 600;
    font-size: 0.9em;
    content: "No";
    transition: left 0.4s;
  }

  :has(:checked)::after {
    left: 71px;
    content: "Yes";
  }

  input {
    display: none;
  }
`;
