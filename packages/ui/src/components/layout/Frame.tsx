import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { backgroundColor, textColor } from "../../styles/color";
import { isNotSmall } from "../../styles/layout";
import { headerHeight } from "./Header";
import { footerHeight } from "./Footer";
import { Loading } from "../Loading";

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export const Frame: FC<Props> = ({ isLoading, children }) => {
  return (
    <div aria-busy={isLoading} css={styles}>
      {isLoading && <Loading />}
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
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  ${isNotSmall} {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 340px;
  }
  padding: 16px 0;
`;
