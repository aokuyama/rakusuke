import { FC } from "react";
import { Header } from "ui/src/components/layout/Header";
import { Site } from "infra/src/web/site";
import { Footer } from "ui/src/components/layout/Footer";
import { Dev } from "@/features/dev/components/Dev";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header title={Site.name} slogan={Site.slogan} />
      {children}
      <Footer title={Site.name} />
      <Dev />
    </>
  );
};
