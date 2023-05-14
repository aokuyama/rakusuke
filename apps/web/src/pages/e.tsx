import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC, useState } from "react";
import { UpcomingEvent } from "domain/src/model/event";
import { Page } from "@/components/pages/view_event/Page";
import { EventGuest } from "domain/src/model/guest";
import { Site } from "@/registry";
import { useEvent } from "@/hooks/useEvent";

export const Schedule: FC = () => {
  const { event, setEvent } = useEvent();
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);

  return (
    <>
      <Head>
        <title>{title(event)}</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <Layout>
        <Page
          event={event}
          setEvent={setEvent}
          targetGuest={targetGuest}
          setTargetGuest={setTargetGuest}
        />
      </Layout>
    </>
  );
};

export default Schedule;

const title = (event: UpcomingEvent | null | undefined): string => {
  if (event) {
    return event.name + " はいつがいいですか？ by " + Site.name;
  }
  return Site.name;
};
