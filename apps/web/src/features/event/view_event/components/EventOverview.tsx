import { FC, useContext } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { ScheduleSummary } from "./ScheduleSummary";
import { Button } from "ui/src/components/Button";
import { loadingContext } from "@/hooks/useLoading";
import { CurrentEvent } from "domain/src/model/event";
import { EventDate } from "../../decide_on_event_date/types";

interface Props {
  event: CurrentEvent;
  onEdit?: () => void;
  onDrawing?: () => void;
  focus: EventDate | undefined;
  setFocus: (day: EventDate | undefined) => void;
}

export const EventOverview: FC<Props> = ({
  event,
  onEdit,
  onDrawing,
  focus,
  setFocus,
}) => {
  const loadingCtx = useContext(loadingContext);
  const button = onEdit
    ? { clickHandler: onEdit, disabled: loadingCtx.loading }
    : undefined;
  return (
    <EditBox name={"日程候補"} button={button}>
      <ScheduleSummary event={event} setFocus={setFocus} focus={focus} />
      {onDrawing && event.scheduleLength() > 1 && (
        <Button onClick={onDrawing} disabled={loadingCtx.loading}>
          開催日を抽選
        </Button>
      )}
    </EditBox>
  );
};
