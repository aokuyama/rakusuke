import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { Site } from "@/lib/site";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header title={Site.name} />
      {children}
    </>
  );
};
