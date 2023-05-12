import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
};

export const TextBox: FC<Props> = ({ label, placeholder, value, setValue }) => {
  const onChange = setValue
    ? (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!(e.target instanceof HTMLInputElement)) {
          return;
        }
        setValue(e.target.value);
      }
    : undefined;

  return (
    <label>
      <span css={labelStyle}>{label}</span>
      <input
        type="text"
        css={textbox}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

const textbox = css`
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
