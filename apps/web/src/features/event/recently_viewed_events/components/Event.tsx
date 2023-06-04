import { CurrentEvent } from "domain/src/model/event";
import { Site } from "infra/src/web/site";
import { FC } from "react";
import { LinkBox } from "ui/src/components/LinkBox";

interface Props {
  event: CurrentEvent;
}

export const Event: FC<Props> = ({ event }) => {
  return (
    <LinkBox name={event.name} href={Site.getEventPagePath(event.path)}>
      {event.dateSummary()}
    </LinkBox>
  );
};
