import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { Site } from "infra/src/web/site";
import { useEvent } from "@/hooks/useEvent";
import { ViewEventPage } from "@/components/pages/view_event/ViewEventPage";
import { useRecentEvents } from "@/features/event/recently_viewed_events/hooks/useRecentEvents";
import { CurrentEvent } from "domain/src/model/event";

export const EventPage: FC = () => {
  const { events, setEvents } = useRecentEvents();
  const { event, setEvent } = useEvent(setEvents);

  const setEventHandler = (event: CurrentEvent | null) => {
    setEvent(event);
    if (event) {
      setEvents(event);
    }
  };

  return (
    <>
      <Head>
        <title>{Site.getEventPageTitle(event)}</title>
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
