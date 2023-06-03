import { FC } from "react";
import { CountList } from "ui/src/components/CountList";

export type Item = { id: string | number; name: string; length: number };

type Props = {
  summary: Item[];
};

export const Summary: FC<Props> = ({ summary }) => {
  return <CountList items={summary} howToCount="人" />;
};
