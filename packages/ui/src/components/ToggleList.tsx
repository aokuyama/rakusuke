import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { backgroundColor } from "../styles/color";

export type Item = {
  id: string;
  name: string;
  checked: boolean;
};

type Props = {
  children: ReactNode;
};

export const ToggleList: FC<Props> = ({ children }) => {
  return <ul css={styles}>{children}</ul>;
};

const styles = css`
  list-style-type: none;
  padding: 1em;
  ${backgroundColor.default};
  margin: 0 auto 16px;
`;
