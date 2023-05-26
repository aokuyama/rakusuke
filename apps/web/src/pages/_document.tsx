import { Site } from "@/registry";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head prefix="og: http://ogp.me/ns#">
        <meta property="og:url" content="https://raku.day/" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={Site.slogan} />
        <meta property="og:site_name" content={Site.name} />
        <meta property="og:image" content="https://raku.day/img/ogp.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
