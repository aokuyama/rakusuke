import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../../styles/color";
import { EditButton } from "../EditButton";

type Props = {
  name: ReactNode;
  button?: {
    clickHandler: () => void;
  };
  children: React.ReactNode;
};

export const EditBox: FC<Props> = ({ name, button, children }) => {
  return (
    <div css={boxStyle}>
      <div css={titleStyle}>
        <div />
        <span>{name}</span>
        <div>{button && <EditButton onClick={button.clickHandler} />}</div>
      </div>
      <div css={contentStyle}>{children}</div>
    </div>
  );
};

const boxStyle = css`
  width: 480px;
  margin: 0 auto 16px;
  border-radius: 3px;
  ${backgroundColor.default}
`;
const titleStyle = css`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  div {
    display: inline-block;
    width: 32px;
  }
  span {
    display: inline-block;
    text-align: center;
    width: ${480 - 32 - 32}px;
    padding: 8px 0;
  }
`;
const contentStyle = css`
  margin: 0;
  padding: 16px;
`;
