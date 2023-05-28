import { useEffect, useState } from "react";
import { client } from "infra/src/client/trpc";
import { CurrentEvent } from "domain/src/model/event";
import { storage } from "@/registry";
import { Site } from "infra/src/web/site";
import { useRouter } from "next/router";

export const useEvent = (): {
  event: CurrentEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<CurrentEvent | null | undefined>
  >;
} => {
  const [event, setEvent] = useState<CurrentEvent | null | undefined>(
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
): Promise<CurrentEvent | null | undefined> => {
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

  return CurrentEvent.new(result.event);
};

const useEventQuery = (): string | undefined => {
  const [eventQuery, setEventQuery] = useState<string | undefined>(undefined);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.isReady) {
      const path = Site.parseEventPathByQueryArray(query);
      if (path) {
        setEventQuery(path);
      } else {
        const path = Site.parseEventPathByPath(location.pathname);
        if (path) {
          // /e/xxx が /e/ にリライトされないとここには到達しない
          setEventQuery(path);
        }
      }
    }
  }, [query, router]);
  return eventQuery;
};
