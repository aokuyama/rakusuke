import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { Site } from "infra/src/web/site";
import { EventCreationPage } from "@/components/pages/event_creation/EventCreationPage";

export const Top: FC = () => {
  return (
    <>
      <Head>
        <title>{Site.name}</title>
        <meta property="og:title" content={Site.name} />
      </Head>
      <Layout>
        <EventCreationPage />
      </Layout>
    </>
  );
};

export default Top;
