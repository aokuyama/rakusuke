import { createContext, useCallback, useState } from "react";

type LoadingContext = {
  loading: boolean;
  setAsLoading: () => void;
  setAsNotLoading: () => void;
};

const defaultContext: LoadingContext = {
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAsLoading: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAsNotLoading: () => {},
};

export const loadingContext = createContext<LoadingContext>(defaultContext);

export const useLoading = (): LoadingContext => {
  const [loading, setLoading] = useState<boolean>(false);

  const setAsLoading = useCallback((): void => {
    setLoading(true);
  }, []);

  const setAsNotLoading = useCallback((): void => {
    setLoading(false);
  }, []);

  return { loading, setAsLoading, setAsNotLoading };
};
