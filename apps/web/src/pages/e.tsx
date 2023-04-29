import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "infra/src/client/trpc";
import { UpcomingEvent } from "domain/src/model/event";

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

  if (event === undefined) {
    return <>loading...</>;
  }
  if (!event) {
    return <>event not found</>;
  }

  return (
    <>
      <Head>
        <title>{event.name}</title>
      </Head>
      <Layout>{event.name}</Layout>
    </>
  );
};

export default Schedule;

const loadEvent = async (path: string): Promise<UpcomingEvent | null> => {
  if (path.length == 0) {
    return null;
  }
  const result = await client.event.getEventByPath.query(path);
  return result.event;
};
