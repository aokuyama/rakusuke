import { FC } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { Summary } from "./Summary";
import { Schedule } from "../types/schedule";
import { Button } from "ui/src/components/Button";

interface Props {
  name: string;
  summary: Schedule[];
  onEdit?: () => void;
  onDrawing?: () => void;
  focusId: string | undefined;
  setFocus: (id: string | undefined) => void;
}

export const EventOverview: FC<Props> = ({
  name,
  summary,
  onEdit,
  onDrawing,
  focusId,
  setFocus,
}) => {
  const button = onEdit ? { clickHandler: onEdit } : undefined;
  return (
    <EditBox name={name} button={button}>
      <Summary summary={summary} setFocus={setFocus} focusId={focusId} />
      {onDrawing && summary.length > 1 && (
        <Button onClick={onDrawing}>開催日を抽選</Button>
      )}
    </EditBox>
  );
};
