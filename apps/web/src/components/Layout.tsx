import { FC } from "react";
import { Header } from "ui/src/components/layout/Header";
import { Site } from "@/registry";
import { Main } from "ui/src/components/layout/Main";
import { Aside } from "ui/src/components/layout/Aside";
import { Footer } from "ui/src/components/layout/Footer";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header title={Site.name} slogan={Site.slogan} />
      <Main>{children}</Main>
      <Aside>{}</Aside>
      <Footer title={Site.name} />
    </>
  );
};
