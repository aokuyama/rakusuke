import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../../styles/color";
import { boxLayout } from "../../styles/layout";

type Props = {
  children: ReactNode;
};

export const Box: FC<Props> = ({ children }) => {
  return (
    <div css={boxStyle}>
      <div css={contentStyle}>{children}</div>
    </div>
  );
};

const boxStyle = css`
  ${boxLayout.default}
  border-radius: 3px;
  ${backgroundColor.default}
`;

const contentStyle = css`
  margin: 0;
  padding: 16px;
`;
