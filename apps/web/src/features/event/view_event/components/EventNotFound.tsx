import { FC } from "react";
import { css } from "@emotion/react";
import { Box } from "ui/src/components/Box";

export const EventNotFound: FC = () => {
  return (
    <Box name={"イベントが見つかりません"}>
      <div css={styles}>URLが間違っているか、表示期限が切れています</div>
    </Box>
  );
};

const styles = css`
  height: 73px;
`;
