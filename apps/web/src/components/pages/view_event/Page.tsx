import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC, useState } from "react";
import { Main } from "./Main";
import { EventGuest } from "domain/src/model/guest";
import { Site } from "infra/src/web/site";
import { useEvent } from "@/hooks/useEvent";

export const Page: FC = () => {
  const { event, setEvent } = useEvent();
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);

  return (
    <>
      <Head>
        <title>{Site.getEventPageTitle(event)}</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <Layout>
        <Main
          event={event}
          setEvent={setEvent}
          targetGuest={targetGuest}
          setTargetGuest={setTargetGuest}
        />
      </Layout>
    </>
  );
};
