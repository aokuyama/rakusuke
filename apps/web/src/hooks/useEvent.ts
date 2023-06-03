import { useCallback, useEffect, useState } from "react";
import { client } from "infra/src/client/trpc";
import { CurrentEvent, EventPath } from "domain/src/model/event";
import { storage } from "@/registry";
import { useEventQuery } from "./useEventQuery";

export const useEvent = (
  setFirstEventHandler?: (event: CurrentEvent) => void
): {
  event: CurrentEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<CurrentEvent | null | undefined>
  >;
} => {
  const [event, setEvent] = useState<CurrentEvent | null | undefined>(
    undefined
  );
  const eq = useEventQuery();

  const loadEventCallback = useCallback(async () => {
    if (eq) {
      return await loadEvent(eq);
    }
  }, [eq]);

  useEffect(() => {
    const load = async () => {
      if (eq) {
        const ev = await loadEventCallback();
        console.log(ev);
        if (ev !== undefined) {
          setEvent(ev);
          if (ev && setFirstEventHandler) {
            setFirstEventHandler(ev);
          }
        }
      }
    };
    load();
  }, [eq, loadEventCallback]);

  return { event, setEvent };
};

const loadEvent = async (
  path: string
): Promise<CurrentEvent | null | undefined> => {
  if (!EventPath.newSafe(path)) {
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
