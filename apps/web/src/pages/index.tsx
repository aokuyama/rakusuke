import { Page } from "@/components/pages/top/Page";
import { Head } from "@/components/Head";
import { Layout } from "@/components/Layout";
import { FC } from "react";

export const Top: FC = () => {
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <Layout>
        <Page />
      </Layout>
    </>
  );
};

export default Top;
