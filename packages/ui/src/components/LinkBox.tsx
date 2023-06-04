import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";
import { boxLayout } from "../styles/layout";
import { boxSize } from "../styles/size";
import { WatchButton } from "./WatchButton";

type Props = {
  name: ReactNode;
  href: string;
  children: React.ReactNode;
};

export const LinkBox: FC<Props> = ({ name, href, children }) => {
  return (
    <a css={boxStyle} href={href}>
      <div css={titleStyle}>
        <div />
        <span>{name}</span>
        <div>
          {
            <WatchButton
              onClick={() => {
                return;
              }}
            />
          }
        </div>
      </div>
      <div css={contentStyle}>{children}</div>
    </a>
  );
};

const boxStyle = css`
  ${boxLayout.side}
  border-radius: 3px;
  ${backgroundColor.default}
  display: block;
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
    width: ${boxSize.side - 32 - 32}px;
    padding: 8px 0;
  }
`;
const contentStyle = css`
  margin: 0;
  padding: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
