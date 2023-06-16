import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { RegisteredUser } from "domain/src/model/user";
import { Site } from "infra/src/web/site";
import { EventCreateForm } from "@/features/event/create_event/components/EventCreateForm";
import { Main } from "ui/src/components/layout/Main";
import { Frame } from "ui/src/components/layout/Frame";
import { Aside } from "ui/src/components/layout/Aside";
import { OverviewRecentEvent } from "@/features/event/recently_viewed_events/components/OverviewRecentEvent";
import { useRecentEvents } from "@/features/event/recently_viewed_events/hooks/useRecentEvents";
import { CurrentEvent } from "domain/src/model/event";
import { userContext } from "@/hooks/useUser";
import { SectionR } from "ui/src/components/layout/Section";

export const EventCreationPage: FC = () => {
  const router = useRouter();
  const userCtx = useContext(userContext);

  const eventCreatedHandler = (args: {
    event: CurrentEvent;
    user: RegisteredUser;
  }) => {
    userCtx.setUser(args.user);
    router.push({
      pathname: Site.getEventPagePath(args.event.path),
    });
    setEvents(args.event);
  };
  const { events, setEvents } = useRecentEvents();

  return (
    <Frame>
      <Main>
        <SectionR>
          <EventCreateForm eventCreatedHandler={eventCreatedHandler} />
        </SectionR>
      </Main>
      <Aside>
        <OverviewRecentEvent events={events} currentEvent={undefined} />
      </Aside>
    </Frame>
  );
};
