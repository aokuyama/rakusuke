import { FC } from "react";
import { css } from "@emotion/react";
import { mainColor, textColor } from "../styles/color";
import { boxLayout } from "../styles/layout";

type Props = {
  children: React.ReactNode;
  isHeadline?: boolean;
};

export const Subtitle: FC<Props> = ({ children, isHeadline }) => {
  const first = isHeadline
    ? css`
        :first-letter {
          color: ${mainColor.default};
          font-size: 36px;
        }
      `
    : css`
        margin-top: 12px;
      `;
  return <h2 css={[styles, first]}>{children}</h2>;
};

const styles = css`
  ${boxLayout.default}
  margin: -12px auto 22px;
  min-height: 36px;
  text-align: center;
  ${textColor.default};
`;
