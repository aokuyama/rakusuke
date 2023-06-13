import { useCallback, useContext, useEffect, useState } from "react";
import { client } from "infra/src/client/trpc";
import {
  CurrentEvent,
  CurrentEventLoading,
  CurrentEventNotFound,
  CurrentEventView,
  EventPath,
} from "domain/src/model/event";
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
  event: CurrentEventView | undefined;
  setEvent: React.Dispatch<React.SetStateAction<CurrentEventView | undefined>>;
} => {
  const loadingCtx = useContext(loadingContext);
  const userCtx = useContext(userContext);
  const toast = useToast();
  const [event, setEvent] = useState<CurrentEventView | undefined>();
  const eq = useEventQuery();

  const loadEventCallback = useCallback(async () => {
    if (userCtx.user) {
      if (eq) {
        return await loadEvent(userCtx.user, eq);
      } else {
        return new CurrentEventLoading();
      }
    }
    return undefined;
  }, [eq, userCtx.user]);

  useEffect(() => {
    const load = async () => {
      if (eq) {
        const path = EventPath.newSafe(eq);
        if (path) {
          if ((event === undefined || event.isLoading()) && recentEvents) {
            const tmp = recentEvents.get(path);
            if (tmp) {
              setEvent(tmp);
              loadingCtx.setAsLoading();
              toast.loading("読み込み中...");
            }
          }
        }
        const ev = await loadEventCallback();
        if (ev !== undefined && !ev.isLoading()) {
          loadingCtx.setAsNotLoading();
          toast.dismiss();
          setEvent(ev);
          if (ev.isExist() && setFirstEventHandler) {
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
): Promise<CurrentEvent | CurrentEventNotFound> => {
  if (!EventPath.newSafe(path)) {
    return new CurrentEventNotFound();
  }
  const result = await client.event.getEventByPath.query({
    user: user.getAuthInfo(),
    path: path,
  });

  if (!result.event) {
    return new CurrentEventNotFound();
  }

  return CurrentEvent.new(result.event);
};
