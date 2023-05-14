import { useEffect, useState } from "react";
import { client } from "infra/src/client/trpc";
import { UpcomingEvent } from "domain/src/model/event";
import { storage } from "@/registry";
import { useRouter } from "next/router";

export const useEvent = (): {
  event: UpcomingEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<UpcomingEvent | null | undefined>
  >;
} => {
  const [event, setEvent] = useState<UpcomingEvent | null | undefined>(
    undefined
  );

  const eq = useEventQuery();
  useEffect(() => {
    const load = async () => {
      if (eq) {
        const ev = await loadEvent(eq);
        setEvent(ev);
      }
    };
    load();
  }, [eq]);

  return { event, setEvent };
};

const loadEvent = async (
  path: string
): Promise<UpcomingEvent | null | undefined> => {
  if (path.length == 0) {
    return null;
  }
  const result = await client.event.getEventByPath.query({
    user: storage.getUser().getAuthInfo(),
    path: path,
  });
  if (result.event === undefined) {
    return undefined;
  }
  if (!result.event) {
    return null;
  }

  return UpcomingEvent.new(result.event);
};

const useEventQuery = (): string | undefined => {
  const [eventQuery, setEventQuery] = useState<string | undefined>(undefined);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.isReady) {
      const path = query.p;
      setEventQuery(Array.isArray(path) ? path[0] : path ? path : "");
    }
  }, [query, router]);
  return eventQuery;
};
