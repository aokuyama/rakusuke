import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC, useState } from "react";
import { EventGuest } from "domain/src/model/guest";
import { Site } from "infra/src/web/site";
import { useEvent } from "@/hooks/useEvent";
import { ViewEventPage } from "@/components/pages/view_event/ViewEventPage";

export const EventPage: FC = () => {
  const { event, setEvent } = useEvent();
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);

  return (
    <>
      <Head>
        <title>{Site.getEventPageTitle(event)}</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <Layout>
        <ViewEventPage
          event={event}
          setEvent={setEvent}
          targetGuest={targetGuest}
          setTargetGuest={setTargetGuest}
        />
      </Layout>
    </>
  );
};

export default EventPage;
