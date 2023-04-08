import { default as NextHead } from "next/head";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Head: FC<Props> = (props) => {
  return (
    <NextHead>
      {props.children}
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
