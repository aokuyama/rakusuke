import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { RegisteredUser } from "domain/src/model/user";
import { Site } from "infra/src/web/site";
import { EventCreateForm } from "@/features/event/create_event/components/EventCreateForm";
import { Main } from "ui/src/components/layout/Main";
import { Frame } from "ui/src/components/layout/Frame";
import { Aside } from "ui/src/components/layout/Aside";
import { OverviewRecentEvent } from "@/features/event/recently_viewed_events/components/OverviewRecentEvent";
import { useEvents } from "@/features/event/recently_viewed_events/hooks/useEvents";
import { CurrentEvent, CurrentEventArgs } from "domain/src/model/event";
import { userContext } from "@/hooks/useUser";

export const EventCreationPage: FC = () => {
  const router = useRouter();
  const userCtx = useContext(userContext);

  const eventCreatedHandler = (args: {
    user: { uuid: string; token: string };
    event: CurrentEventArgs;
  }) => {
    const event = CurrentEvent.new(args.event);
    userCtx.setUser(RegisteredUser.new(args.user));
    router.push({
      pathname: Site.getEventPagePath(event.path),
    });
    setEvents(event);
  };
  const { events, setEvents } = useEvents();

  return (
    <Frame>
      <Main>
        <EventCreateForm eventCreatedHandler={eventCreatedHandler} />
      </Main>
      <Aside>
        <OverviewRecentEvent events={events} currentEvent={null} />
      </Aside>
    </Frame>
  );
};
