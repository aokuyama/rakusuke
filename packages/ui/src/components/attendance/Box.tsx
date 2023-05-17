import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { mainColor } from "../../styles/color";

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
  border: 2px solid ${mainColor.default};
  border-radius: 3px;
`;

const contentStyle = css`
  margin: 0;
  padding: 16px;
`;
