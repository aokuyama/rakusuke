import { FC, useContext } from "react";
import { ToggleListItem } from "ui/src/components/ToggleListItem";
import { ToggleList } from "ui/src/components/ToggleList";
import { useDrawingForm } from "../hooks/useDrawingForm";
import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "ui/src/components/FormError";
import { Submit } from "ui/src/components/Submit";
import { CurrentEvent } from "domain/src/model/event";
import { drawingEventDate } from "../trpc";
import { userContext } from "@/hooks/useUser";
import { loadingContext } from "@/hooks/useLoading";
import { Schedule } from "../../view_event/types/schedule";
import { Step } from "ui/src/components/Step";
import { Site } from "infra/src/web/site";

interface Props {
  schedules: Schedule[];
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const DrawingForm: FC<Props> = ({
  schedules,
  event,
  eventUpdatedHandler,
}) => {
  const { register, handleSubmit, errors } = useDrawingForm(schedules);
  const user = useContext(userContext).user;
  const loadingCtx = useContext(loadingContext);
  if (!user) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit((d) => {
        loadingCtx.setAsLoading();
        drawingEventDate(user, event, d.schedule, (e: CurrentEvent) => {
          eventUpdatedHandler(e);
          loadingCtx.setAsNotLoading();
        });
      })}
    >
      <Step>{Site.message.form.event.drawing}</Step>
      <ToggleList>
        {schedules.map((schedule, index) => {
          return (
            <ToggleListItem
              name={schedule.date.short() + "\n" + schedule.length + "人"}
              key={index}
            >
              <input
                type="checkbox"
                {...register(`schedule.${index}.enable` as const)}
              ></input>
            </ToggleListItem>
          );
        })}
      </ToggleList>
      {schedules.map((schedule, index) => {
        return (
          <input
            key={index}
            type="hidden"
            {...register(`schedule.${index}.date` as const)}
            value={schedule.date.toString()}
          ></input>
        );
      })}
      <FormError>
        <ErrorMessage errors={errors} name="schedule" />
      </FormError>
      <Submit label="抽選" decorationRight="arrow-right" />
    </form>
  );
};
