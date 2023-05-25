import { Global } from "@emotion/react";
import { global } from "ui/src/styles/global";
import type { AppProps } from "next/app";
import { loadingContext, useLoading } from "@/hooks/useLoading";
import { OverviewLoading } from "ui/src/components/OverviewLoading";

const globalStyles = <Global styles={global} />;

export const App = ({ Component, pageProps }: AppProps) => {
  const ctx = useLoading();
  return (
    <loadingContext.Provider value={ctx}>
      {globalStyles}
      <OverviewLoading isLoading={ctx.loading} />
      <Component {...pageProps} />
    </loadingContext.Provider>
  );
};

export default App;
