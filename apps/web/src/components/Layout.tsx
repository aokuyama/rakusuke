import { FC } from "react";
import { Header } from "ui/src/components/layout/Header";
import { Site } from "infra/src/web/site";
import { Footer, LinkProps } from "ui/src/components/layout/Footer";
import { Dev } from "@/features/dev/components/Dev";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const link: LinkProps[] = [
    {
      title: "GitHub",
      url: "https://github.com/aokuyama/rakusuke",
      icon: "github",
    },
    {
      title: "Release notes",
      url: "https://aokuyama.notion.site/a5d36c765387437db4ab7dc24eb391af",
    },
  ];
  return (
    <>
      <Header title={Site.name} slogan={Site.slogan} />
      {children}
      <Footer title={Site.name} link={link} />
      <Dev />
    </>
  );
};
