import { FC } from "react";
import { css } from "@emotion/react";
import { mainColor, textColor } from "../styles/color";

type Props = {
  children: React.ReactNode;
};

export const Subtitle: FC<Props> = ({ children }) => {
  return <h2 css={styles}>{children}</h2>;
};

const styles = css`
  margin: -12px 0 22px;
  min-height: 36px;
  text-align: center;
  ${textColor.default};
  :first-letter {
    color: ${mainColor.default};
    font-size: 36px;
  }
`;
