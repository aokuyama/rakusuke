import { css } from "@emotion/react";
import { FC } from "react";
import { Box } from "ui/src/components/Box";
import { Skeleton } from "ui/src/components/Skeleton";

export const EventLoading: FC = () => {
  return (
    <Box name={<Skeleton height={18} />}>
      <div css={styles}>
        <div css={skeleton}>
          <Skeleton height={24} />
        </div>
        <div css={skeleton}>
          <Skeleton height={24} />
        </div>
      </div>
    </Box>
  );
};

const styles = css`
  height: 73px;
`;
const skeleton = css`
  margin-bottom: 12px;
`;
