import { FC, useContext } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { Summary } from "./Summary";
import { Schedule } from "../types/schedule";
import { Button } from "ui/src/components/Button";
import { StickyNote } from "ui/src/components/StickyNote";
import { loadingContext } from "@/hooks/useLoading";

interface Props {
  event: { name: string; description: string | undefined };
  summary: Schedule[];
  onEdit?: () => void;
  onDrawing?: () => void;
  focusId: string | undefined;
  setFocus: (id: string | undefined) => void;
}

export const EventOverview: FC<Props> = ({
  event,
  summary,
  onEdit,
  onDrawing,
  focusId,
  setFocus,
}) => {
  const loadingCtx = useContext(loadingContext);
  const button = onEdit
    ? { clickHandler: onEdit, disabled: loadingCtx.loading }
    : undefined;
  return (
    <EditBox name={event.name} button={button}>
      <Summary summary={summary} setFocus={setFocus} focusId={focusId} />
      {event.description && event.description.length && (
        <StickyNote>{event.description}</StickyNote>
      )}
      {onDrawing && summary.length > 1 && (
        <Button onClick={onDrawing}>開催日を抽選</Button>
      )}
    </EditBox>
  );
};
