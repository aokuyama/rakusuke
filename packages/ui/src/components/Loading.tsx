import { FC, ReactNode } from "react";
import { css } from "@emotion/react";
import { Spinner } from "./Spinner";

type Props = {
  children?: ReactNode;
  isLoading: boolean;
};

export const Loading: FC<Props> = ({ children, isLoading }) => {
  return (
    <div aria-live="polite" aria-busy={isLoading} css={styles}>
      {isLoading && <Spinner />}
      {!isLoading && children}
    </div>
  );
};

const styles = css`
  margin: auto;
`;
