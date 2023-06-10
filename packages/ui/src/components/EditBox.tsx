import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";
import { boxLayout } from "../styles/layout";
import { EditButton } from "./EditButton";
import { boxSize, font } from "../styles/size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: ReactNode;
  remarks?: string;
  button?: {
    clickHandler: () => void;
  };
  children: React.ReactNode;
  closable?: { defaultIsClose: boolean };
};

export const EditBox: FC<Props> = ({
  name,
  remarks,
  button,
  closable,
  children,
}) => {
  return (
    <details css={detailsStyle} open={!(closable && closable.defaultIsClose)}>
      <summary
        css={summaryStyle}
        onClick={(e) => {
          if (!closable) {
            e.preventDefault();
          }
        }}
      >
        <div css={summaryTitleStyle}>
          <div>
            {closable && <FontAwesomeIcon icon={faChevronDown} width={18} />}
          </div>
          <span>{name}</span>
          <div>{button && <EditButton onClick={button.clickHandler} />}</div>
        </div>
        <p css={remarksStyle}>{remarks}</p>
      </summary>
      <div css={contentStyle}>{children}</div>
    </details>
  );
};

const detailsStyle = css`
  &[open] > summary > div > div:first-child {
    rotate: 180deg;
  }
  &[open] > summary > div > span {
    white-space: wrap;
  }
  &[open] > summary > p {
    padding: 12px 12px 0;
    font-size: ${font.small}px;
    white-space: wrap;
  }
  &[open] > summary > p:empty {
    padding: 0;
  }
  ${boxLayout.default}
  border-radius: 3px;
  ${backgroundColor.default}
`;
const summaryStyle = css`
  margin: 0;
  padding: 16px 0 0;
`;
const summaryTitleStyle = css`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const remarksStyle = css`
  display: block;
  text-align: center;
  font-size: ${font.tiny}px;
  padding: 8px 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const contentStyle = css`
  margin: 0;
  padding: 0 16px 0.1px;
`;
