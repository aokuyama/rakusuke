import { useMemo } from "react";
import { Site } from "infra/src/web/site";
import { useRouter } from "next/router";

export const useEventQuery = (): string | undefined => {
  const router = useRouter();
  const query = router.query;

  return useMemo(() => {
    if (!router.isReady) {
      return;
    }
    const path = Site.parseEventPathByPath(location.pathname);
    if (path) {
      return path;
    }
    const path2 = Site.parseEventPathByQueryArray(query);
    if (path2) {
      return path2;
    }
  }, [query, router.isReady]);
};
