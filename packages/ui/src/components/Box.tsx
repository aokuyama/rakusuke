import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";
import { boxLayout } from "../styles/layout";
import { CloseButton } from "./CloseButton";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  name: ReactNode;
  button?: {
    handler: () => void;
  };
  icon?: "editUser";
  children: React.ReactNode;
};

export const Box: FC<Props> = ({ name, button, icon, children }) => {
  return (
    <div css={boxStyle}>
      <div css={titleStyle}>
        <div css={iconStyle}></div>
        <span css={nameStyle}>{name}</span>
        <div css={iconStyle}>
          {icon === "editUser" && (
            <FontAwesomeIcon icon={faUserPen} width={20} />
          )}
          {button && <CloseButton onClick={button.handler} />}
        </div>
      </div>
      <div css={contentStyle}>{children}</div>
    </div>
  );
};

const boxStyle = css`
  ${boxLayout.default}
  border-radius: 3px;
  ${backgroundColor.default}
`;
const titleStyle = css`
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;
const contentStyle = css`
  margin: 0;
  padding: 0 16px 0.1px;
`;

const iconStyle = css`
  text-align: center;
  display: inline-block;
  width: 32px;
  margin: 0 8px;
`;

const nameStyle = css`
  display: inline-block;
  text-align: center;
`;
