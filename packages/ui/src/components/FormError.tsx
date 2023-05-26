import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { systemColor } from "../styles/color";
import { boxLayout } from "../styles/layout";

type Props = {
  children?: ReactNode;
};

export const FormError: FC<Props> = ({ children }) => {
  return <p css={styles}>{children}</p>;
};

const styles = css`
  ${boxLayout.default}
  color: ${systemColor.error};
`;
