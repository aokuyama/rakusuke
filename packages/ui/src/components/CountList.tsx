import { FC, ReactNode } from "react";
import { textColor } from "../styles/color";
import { css } from "@emotion/react";

type Props = {
  children: ReactNode;
};

export const CountList: FC<Props> = ({ children }) => {
  return <ul css={styles}>{children}</ul>;
};

const styles = css`
  ${textColor.default};
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
`;
