import { FC } from "react";
import { css } from "@emotion/react";
import { backgroundColor, mainColor, textColor } from "../styles/color";
import { boxLayout } from "../styles/layout";
import { font } from "../styles/size";

type Props = {
  children: React.ReactNode;
};

export const StickyNote: FC<Props> = ({ children }) => {
  return <div css={styles}>{children}</div>;
};

export const styles = css`
  ${boxLayout.default}
  line-height: ${font.default}px;
  white-space: pre-wrap;
  padding: 16px;
  border-left: 4px solid ${mainColor.brighter};
  ${backgroundColor.default}
  ${textColor.default}
`;
