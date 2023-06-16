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
  event: CurrentEventView;
  setEvent: React.Dispatch<React.SetStateAction<CurrentEventView>>;
} => {
  const loadingCtx = useContext(loadingContext);
  const userCtx = useContext(userContext);
  const [toast, setToast] = useState(useToast());
  const [event, setEvent] = useState<CurrentEventView>(
    new CurrentEventLoading()
  );
  const eq = useEventQuery();

  const loadEventCallback = useCallback(async () => {
    if (userCtx.user) {
      if (eq) {
        return await loadEvent(userCtx.user, eq);
      } else {
        return new CurrentEventLoading(eq);
      }
    }
    return new CurrentEventLoading();
  }, [eq, userCtx.user]);

  useEffect(() => {
    const load = async () => {
      if (!eq) {
        return;
      }
      if (event.isLoading()) {
        loadingCtx.setAsLoading();
        setToast(toast.loading("読み込み中..."));
        const path = EventPath.newSafe(eq);
        if (path && recentEvents) {
          const tmp = recentEvents.get(path);
          if (tmp) {
            setEvent(tmp);
          }
        }
        const ev = await loadEventCallback();
        if (!ev.isLoading()) {
          loadingCtx.setAsNotLoading();
          setToast(toast.dismiss());
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
  if (path === "eventloadingtest") {
    return new CurrentEventLoading();
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
