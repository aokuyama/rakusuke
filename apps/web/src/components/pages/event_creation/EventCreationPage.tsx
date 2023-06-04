import { FC } from "react";
import { useRouter } from "next/router";
import { storage } from "@/registry";
import { RegisteredUser } from "domain/src/model/user";
import { Site } from "infra/src/web/site";
import { EventCreateForm } from "@/features/event/create_event/components/EventCreateForm";
import { Main } from "ui/src/components/layout/Main";
import { Frame } from "ui/src/components/layout/Frame";
import { Aside } from "ui/src/components/layout/Aside";
import { OverviewRecentEvent } from "@/features/event/recently_viewed_events/components/OverviewRecentEvent";
import { useEvents } from "@/features/event/recently_viewed_events/hooks/useEvents";
import { CurrentEvent, CurrentEventArgs } from "domain/src/model/event";

export const EventCreationPage: FC = () => {
  const router = useRouter();

  const eventCreatedHandler = (args: {
    user: { uuid: string; token: string };
    event: CurrentEventArgs;
  }) => {
    const event = CurrentEvent.new(args.event);
    storage.saveUser(RegisteredUser.new(args.user));
    router.push({
      pathname: Site.getEventPagePath(event.path),
    });
    setEvents(event);
  };
  const user = storage.getUser();
  const { events, setEvents } = useEvents();

  return (
    <Frame>
      <Main>
        <EventCreateForm
          user={user}
          eventCreatedHandler={eventCreatedHandler}
        />
      </Main>
      <Aside>
        <OverviewRecentEvent events={events} currentEvent={null} />
      </Aside>
    </Frame>
  );
};
