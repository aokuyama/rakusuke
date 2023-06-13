import { FC } from "react";
import { css } from "@emotion/react";

type Props = {
  height: number;
};

export const Skeleton: FC<Props> = ({ height }) => {
  return (
    <div css={styles}>
      <div
        css={[
          css`
            height: ${height}px;
          `,
          body,
        ]}
      />
    </div>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;

  div {
    border-radius: 1px;
    background-color: #eeeeee;
    background-image: linear-gradient(
      to right,
      #eeeeee 5%,
      #dedede 15%,
      #eeeeee 30%
    );
    animation: skeleton 2s linear infinite;
  }

  @keyframes skeleton {
    from {
      background-position-x: -320px;
    }
    to {
      background-position-x: 320px;
    }
  }
`;

const body = css`
  width: 100%;
`;
