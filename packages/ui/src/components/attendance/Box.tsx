import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor, mainColor } from "../../styles/color";

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
  width: 480px;
  margin: 0 auto 16px;
  border-radius: 3px;
  ${backgroundColor.default}
`;

const contentStyle = css`
  margin: 0;
  padding: 16px;
`;
