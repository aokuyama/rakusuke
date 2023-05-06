import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { Site } from "@/registry";

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
