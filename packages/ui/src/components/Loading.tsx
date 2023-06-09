import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { Spinner } from "./Spinner";
import { headerHeight } from "./layout/Header";
import { footerHeight } from "./layout/Footer";

type Props = {
  children?: ReactNode;
  isLoading: boolean;
};

export const Loading: FC<Props> = ({ children, isLoading }) => {
  return (
    <div aria-live="polite" aria-busy={isLoading} css={styles}>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isLoading && children}
    </div>
  );
};

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${headerHeight} - ${footerHeight});
`;
