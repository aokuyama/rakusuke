import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Aside: FC<Props> = ({ children }) => {
  return <aside>{children}</aside>;
};
