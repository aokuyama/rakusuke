import { FC, useContext } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { EventSummary } from "./EventSummary";
import { Button } from "ui/src/components/Button";
import { StickyNote } from "ui/src/components/StickyNote";
import { loadingContext } from "@/hooks/useLoading";
import { CurrentEvent } from "domain/src/model/event";

interface Props {
  event: CurrentEvent;
  onEdit?: () => void;
  onDrawing?: () => void;
  focusId: string | undefined;
  setFocus: (id: string | undefined) => void;
}

export const EventOverview: FC<Props> = ({
  event,
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
      <EventSummary event={event} setFocus={setFocus} focusId={focusId} />
      {event.description && event.description.length && (
        <StickyNote>{event.description}</StickyNote>
      )}
      {onDrawing && event.scheduleLength() > 1 && (
        <Button onClick={onDrawing}>開催日を抽選</Button>
      )}
    </EditBox>
  );
};
