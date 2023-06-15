import { CurrentEvent } from "domain/src/model/event";
import { Site } from "infra/src/web/site";
import { FC } from "react";
import { Box } from "ui/src/components/Box";
import { Anchor } from "ui/src/components/Anchor";
import { css } from "@emotion/react";

interface Props {
  event: CurrentEvent;
}

export const Event: FC<Props> = ({ event }) => {
  return (
    <Box
      name={
        <Anchor href={Site.getEventPagePath(event.path)}>{event.name}</Anchor>
      }
      icon={event.isOrganizer ? "editUser" : undefined}
    >
      <div css={styles}>{event.dateSummary()}</div>
    </Box>
  );
};

const styles = css`
  margin: 16px;
  padding: 0 0 0.1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
