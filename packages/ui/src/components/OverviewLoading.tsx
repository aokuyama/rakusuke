import { FC } from "react";
import { css } from "@emotion/react";
import { Spinner } from "./Spinner";

type Props = {
  isLoading: boolean;
};

export const OverviewLoading: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div css={styles}>
          <div>
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
};

const styles = css`
  z-index: 99999;
  position: fixed;
  height: 100%;
  width: 100%;
  transition: 1s;
  background-color: #000;
  opacity: 0.33;
  cursor: wait;
  div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 120px;
    height: 120px;
  }
`;
