import { Global } from "@emotion/react";
import { global } from "ui/src/styles/global";
import type { AppProps } from "next/app";
import { userContext, useUser } from "@/hooks/useUser";
import { loadingContext, useLoading } from "@/hooks/useLoading";
import { Toaster } from "ui/src/components/Toaster";

const globalStyles = <Global styles={global} />;

export const App = ({ Component, pageProps }: AppProps) => {
  const userCtx = useUser();
  const loadingCtx = useLoading();
  return (
    <userContext.Provider value={userCtx}>
      <loadingContext.Provider value={loadingCtx}>
        {globalStyles}
        <Toaster />
        <Component {...pageProps} />
      </loadingContext.Provider>
    </userContext.Provider>
  );
};

export default App;
