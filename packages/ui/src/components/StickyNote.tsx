import { FC } from "react";
import { css } from "@emotion/react";
import { backgroundColor, mainColor } from "../styles/color";

type Props = {
  children: React.ReactNode;
};

export const StickyNote: FC<Props> = ({ children }) => {
  return <div css={styles}>{children}</div>;
};

export const styles = css`
  white-space: pre-wrap;
  width: 100%;
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 4px solid ${mainColor.brighter};
  ${backgroundColor.background}
`;
