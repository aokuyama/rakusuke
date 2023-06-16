import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { Site } from "infra/src/web/site";
import { useEvent } from "@/hooks/useEvent";
import { ViewEventPage } from "@/components/pages/ViewEventPage";
import { useRecentEvents } from "@/features/event/recently_viewed_events/hooks/useRecentEvents";
import { CurrentEvent } from "domain/src/model/event";

export const EventPage: FC = () => {
  const { events, setEvents } = useRecentEvents();
  const { event, setEvent } = useEvent(events, setEvents);

  const setEventHandler = (event: CurrentEvent) => {
    setEvent(event);
    setEvents(event);
  };

  return (
    <>
      <Head>
        <title>
          {Site.getEventPageTitle(event.isExist() ? event : undefined)}
        </title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <Layout>
        <ViewEventPage
          event={event}
          setEvent={setEventHandler}
          events={events}
        />
      </Layout>
    </>
  );
};

export default EventPage;
