import { Page } from "@/components/pages/create_event/Page";
import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { Site } from "@/registry";

export const Top: FC = () => {
  return (
    <>
      <Head>
        <title>{Site.name}</title>
      </Head>
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default Top;
