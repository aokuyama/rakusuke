import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";
import { boxLayout } from "../styles/layout";
import { EditButton } from "./EditButton";
import { boxSize } from "../styles/size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: ReactNode;
  button?: {
    clickHandler: () => void;
  };
  children: React.ReactNode;
  closable?: { defaultIsClose: boolean };
};

export const EditBox: FC<Props> = ({ name, button, closable, children }) => {
  return (
    <div css={toggle}>
      <details css={boxStyle} open={!(closable && closable.defaultIsClose)}>
        <summary
          css={titleStyle}
          onClick={(e) => {
            if (!closable) {
              e.preventDefault();
            }
          }}
        >
          <div>
            {closable && <FontAwesomeIcon icon={faChevronDown} width={18} />}
          </div>
          <span>{name}</span>
          <div>{button && <EditButton onClick={button.clickHandler} />}</div>
        </summary>
        <div css={contentStyle}>{children}</div>
      </details>
    </div>
  );
};

const toggle = css`
  [open] > summary div:first-child {
    rotate: 180deg;
  }
`;

const boxStyle = css`
  ${boxLayout.default}
  border-radius: 3px;
  ${backgroundColor.default}
  :open summary div {
    display: none;
  }
`;
const titleStyle = css`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  div {
    font-size: 20;
    line-height: 20px;
    height: 20px;
    text-align: center;
    display: inline-block;
    width: 32px;
  }
  span {
    display: inline-block;
    text-align: center;
    width: ${boxSize.default - 32 - 32}px;
    padding: 8px 0;
  }
`;
const contentStyle = css`
  margin: 0;
  padding: 16px;
`;
