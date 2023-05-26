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
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default NewEvent;
