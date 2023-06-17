import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { backgroundColor, textColor } from "../../styles/color";
import { headerHeight } from "./Header";
import { footerHeight } from "./Footer";

type Props = {
  children: ReactNode;
};

export const Frame: FC<Props> = ({ children }) => {
  return (
    <div css={styles}>
      <div css={glidStyles}>{children}</div>
    </div>
  );
};

const styles = css`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  ${textColor.default};
  ${backgroundColor.background}
`;
const glidStyles = css`
  max-width: 1280px;
  margin: 16px auto 0;
`;
