import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  label?: string;
  placeholder?: string;
};

export const TextBox: FC<Props> = (props) => {
  return (
    <label>
      <span css={label}>{props.label}</span>
      <input type="text" css={textbox} placeholder={props.placeholder} />
    </label>
  );
};

const textbox = css`
  color: #333;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #969da3;
  border-radius: 3px;
  font-size: 1em;
  line-height: 1.5;
  ::placeholder {
    color: #999;
  }
`;
const label = css`
  color: #333;
  display: block;
  margin-bottom: 5px;
  font-size: 0.9em;
`;
