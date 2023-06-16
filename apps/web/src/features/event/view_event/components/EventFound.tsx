import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventTitle } from "./EventTitle";
import { EventBody } from "./EventBody";

type Props = {
  event: CurrentEvent;
  setEvent: (event: CurrentEvent) => void;
};

export const EventFound: FC<Props> = ({ event, setEvent }) => {
  return (
    <>
      <EventTitle event={event} setEvent={setEvent} />
      <EventBody event={event} setEvent={setEvent} />
    </>
  );
};
