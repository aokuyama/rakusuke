import { FC } from "react";

type Props = {
  title: string;
};

export const Header: FC<Props> = ({ title }) => {
  return <header>{title}</header>;
};
