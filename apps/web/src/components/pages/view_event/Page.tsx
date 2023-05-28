import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC, useState } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { Main } from "./Main";
import { EventGuest } from "domain/src/model/guest";
import { Site } from "@/registry";
import { useEvent } from "@/hooks/useEvent";

export const Page: FC = () => {
  const { event, setEvent } = useEvent();
  const [targetGuest, setTargetGuest] = useState<EventGuest | null>(null);

  return (
    <>
      <Head>
        <title>{title(event)}</title>
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

const title = (event: CurrentEvent | null | undefined): string => {
  if (event) {
    return event.name + " はいつがいいですか？ by " + Site.name;
  }
  return Site.name;
};
