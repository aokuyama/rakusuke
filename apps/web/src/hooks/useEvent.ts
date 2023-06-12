import { useCallback, useContext, useEffect, useState } from "react";
import { client } from "infra/src/client/trpc";
import { CurrentEvent, EventPath } from "domain/src/model/event";
import { useEventQuery } from "./useEventQuery";
import { User } from "domain/src/model/user";
import { userContext } from "./useUser";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";
import { loadingContext } from "./useLoading";
import { useToast } from "./useToast";

export const useEvent = (
  recentEvents?: RecentlyViewedEvent | undefined,
  setFirstEventHandler?: (event: CurrentEvent) => void
): {
  event: CurrentEvent | null | undefined;
  setEvent: React.Dispatch<
    React.SetStateAction<CurrentEvent | null | undefined>
  >;
} => {
  const loadingCtx = useContext(loadingContext);
  const userCtx = useContext(userContext);
  const toast = useToast();
  const [event, setEvent] = useState<CurrentEvent | null | undefined>(
    undefined
  );
  const eq = useEventQuery();

  const loadEventCallback = useCallback(async () => {
    if (userCtx.user && eq) {
      return await loadEvent(userCtx.user, eq);
    }
  }, [eq, userCtx.user]);

  useEffect(() => {
    const load = async () => {
      if (eq) {
        const path = EventPath.newSafe(eq);
        if (path) {
          if (!event && recentEvents) {
            const tmp = recentEvents.get(path);
            if (tmp) {
              setEvent(tmp);
              loadingCtx.setAsLoading();
              toast.loading("読み込み中...");
            }
          }
        }
        const ev = await loadEventCallback();
        if (ev !== undefined) {
          loadingCtx.setAsNotLoading();
          toast.dismiss();
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
  user: User,
  path: string
): Promise<CurrentEvent | null | undefined> => {
  if (!EventPath.newSafe(path)) {
    return null;
  }
  const result = await client.event.getEventByPath.query({
    user: user.getAuthInfo(),
    path: path,
  });

  if (!result.event) {
    return null;
  }

  return CurrentEvent.new(result.event);
};
