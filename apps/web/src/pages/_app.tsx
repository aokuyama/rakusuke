import { Global } from "@emotion/react";
import { global } from "ui/src/styles/global";
import type { AppProps } from "next/app";

const globalStyles = <Global styles={global} />;

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
};

export default App;
