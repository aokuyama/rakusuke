import { FC } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Title } from "ui/src/components/Title";
import { List } from "ui/src/components/List";

interface Props {
  event: UpcomingEvent | null | undefined;
}

export const Page: FC<Props> = ({ event }) => {
  if (event === undefined) {
    return <>loading...</>;
  }
  if (!event) {
    return <>event not found</>;
  }

  return (
    <>
      <Title>{event.name}</Title>
      <List items={event.dateItems()} />
    </>
  );
};
