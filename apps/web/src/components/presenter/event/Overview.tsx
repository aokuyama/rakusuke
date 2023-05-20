import { FC } from "react";
import { EditBox } from "ui/src/components/attendance/EditBox";
import { Item, Summary } from "ui/src/components/attendance/Summary";

interface Props {
  name: string;
  summary: Item[];
  onClick?: () => void;
}

export const Overview: FC<Props> = ({ name, summary, onClick }) => {
  const button = onClick ? { clickHandler: onClick } : undefined;
  return (
    <EditBox name={name} button={button}>
      <Summary summary={summary} />
    </EditBox>
  );
};
