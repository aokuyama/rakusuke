import { FC } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { storage } from "@/registry";
import { Loading } from "ui/src/components/Loading";
import { Dev } from "@/components/container/dev/Dev";
import { Event } from "@/components/pages/view_event/Event";

interface Props {
  event: CurrentEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<CurrentEvent | null | undefined>
  >;
  targetGuest: EventGuest | null;
  setTargetGuest: React.Dispatch<React.SetStateAction<EventGuest | null>>;
}

export const Main: FC<Props> = ({
  event,
  setEvent,
  targetGuest,
  setTargetGuest,
}) => {
  const user = storage.getUser();

  return (
    <>
      <Loading isLoading={event === undefined}>
        <Event
          event={event}
          setEvent={setEvent}
          targetGuest={targetGuest}
          setTargetGuest={setTargetGuest}
        />
      </Loading>
      <Dev user={user} />
    </>
  );
};
