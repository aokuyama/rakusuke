import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "infra/src/client/trpc";
import { UpcomingEvent } from "domain/src/model/event";
import { Page } from "@/components/pages/view_event/Page";
import { Site } from "@/lib/site";

export const Schedule: FC = () => {
  const router = useRouter();
  const { e } = router.query;
  const [event, setEvent] = useState<UpcomingEvent | null | undefined>();

  useEffect(() => {
    const load = async () => {
      const ev = await loadEvent(Array.isArray(e) ? e[0] : e ? e : "");
      setEvent(ev);
    };
    load();
  }, [e]);

  return (
    <>
      <Head>
        <title>{title(event)}</title>
      </Head>
      <Layout>
        <Page event={event} />
      </Layout>
    </>
  );
};

export default Schedule;

const loadEvent = async (
  path: string
): Promise<UpcomingEvent | null | undefined> => {
  if (path.length == 0) {
    return null;
  }
  const result = await client.event.getEventByPath.query(path);
  if (!result.event) {
    return null;
  }
  return UpcomingEvent.new(result.event);
};

const title = (event: UpcomingEvent | null | undefined): string => {
  if (event) {
    return event.name + " by " + Site.name;
  }
  return Site.name;
};
