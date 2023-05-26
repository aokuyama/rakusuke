import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/pages/create_event/Page";
import { FC } from "react";
import { Site } from "@/registry";

export const NewEvent: FC = () => {
  return (
    <>
      <Head>
        <title>{Site.name}</title>
        <meta property="og:title" content={Site.name} />
      </Head>
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default NewEvent;
