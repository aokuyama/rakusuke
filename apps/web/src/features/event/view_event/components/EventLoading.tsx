import { css } from "@emotion/react";
import { FC } from "react";
import { Box } from "ui/src/components/Box";
import { Button } from "ui/src/components/Button";
import { Message } from "ui/src/components/Message";
import { Skeleton } from "ui/src/components/Skeleton";
import { Subtitle } from "ui/src/components/Subtitle";

export const EventLoading: FC = () => {
  return (
    <>
      <Subtitle>
        <Skeleton height={24} />
      </Subtitle>
      <Message>
        <Skeleton height={24} />
      </Message>
      <Button disabled={true} decorationRight="pen">
        スケジュール入力
      </Button>
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
    </>
  );
};

const styles = css`
  height: 73px;
`;
const skeleton = css`
  margin-bottom: 12px;
`;
