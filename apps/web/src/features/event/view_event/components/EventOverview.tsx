import { FC } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { Schedule, Summary } from "./Summary";

interface Props {
  name: string;
  summary: Schedule[];
  onClick?: () => void;
  focusId: string | undefined;
  setFocus: (id: string | undefined) => void;
}

export const EventOverview: FC<Props> = ({
  name,
  summary,
  onClick,
  focusId,
  setFocus,
}) => {
  const button = onClick ? { clickHandler: onClick } : undefined;
  return (
    <EditBox name={name} button={button}>
      <Summary summary={summary} setFocus={setFocus} focusId={focusId} />
    </EditBox>
  );
};
