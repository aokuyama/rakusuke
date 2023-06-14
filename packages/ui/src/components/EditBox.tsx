import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";
import { boxLayout } from "../styles/layout";
import { EditButton } from "./EditButton";
import { font } from "../styles/size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: ReactNode;
  remarks?: string;
  button?: {
    clickHandler: () => void;
    disabled?: boolean;
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
          <div css={markerStyle}>
            {closable && <FontAwesomeIcon icon={faChevronRight} width={10} />}
          </div>
          <span>{name}</span>
          <div>
            {button && (
              <EditButton
                onClick={button.clickHandler}
                disabled={button.disabled}
              />
            )}
          </div>
        </div>
        <p css={remarksStyle} onClick={(e) => e.preventDefault()}>
          {remarks}
        </p>
      </summary>
      <div css={contentStyle}>{children}</div>
    </details>
  );
};

const detailsStyle = css`
  &[open] > summary > div > div:first-child {
    rotate: 90deg;
  }
  &[open] > summary > div > span {
    white-space: normal;
  }
  &[open] > summary > p {
    padding: 12px 12px 0;
    font-size: ${font.small}px;
    white-space: normal;
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
  padding: 12px 0 0;
`;
const summaryTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  div {
    font-size: 20px;
    line-height: 20px;
    height: 20px;
    text-align: center;
    display: inline-block;
    width: 32px;
    flex-shrink: 0;
  }
  span {
    margin: 4px 4px 0;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const remarksStyle = css`
  display: block;
  text-align: center;
  font-size: ${font.tiny}px;
  padding: 0 64px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const contentStyle = css`
  margin: 0;
  padding: 0 16px 0.1px;
`;
const markerStyle = css`
  margin-top: 2px;
`;
