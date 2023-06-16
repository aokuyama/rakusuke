import { FC } from "react";
import { css } from "@emotion/react";
import { textColor } from "../styles/color";

type Props = {
  children: React.ReactNode;
  type?: "unavailable";
};

export const Message: FC<Props> = ({ children, type }) => {
  return (
    <p
      css={[
        styles,
        css`
          ${type === "unavailable" ? textColor.disabled : textColor.default};
        `,
      ]}
    >
      {children}
    </p>
  );
};

export const styles = css`
  text-align: center;
  margin: 16px auto;
`;
