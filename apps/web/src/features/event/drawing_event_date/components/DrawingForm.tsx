import { FC, useContext } from "react";
import { ToggleListItem } from "ui/src/components/ToggleListItem";
import { ToggleList } from "ui/src/components/ToggleList";
import { useDrawingForm } from "../hooks/useDrawingForm";
import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "ui/src/components/FormError";
import { Submit } from "ui/src/components/Submit";
import { CurrentEvent } from "domain/src/model/event";
import { drawingEventDate } from "../trpc";
import { loadingContext } from "@/hooks/useLoading";
import { User } from "domain/src/model/user";
import { Schedule } from "../../view_event/types/schedule";

interface Props {
  schedules: Schedule[];
  user: User;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const DrawingForm: FC<Props> = ({
  schedules,
  user,
  event,
  eventUpdatedHandler,
}) => {
  const { register, handleSubmit, errors } = useDrawingForm(schedules);
  const ctx = useContext(loadingContext);

  return (
    <form
      onSubmit={handleSubmit((d) => {
        ctx.setAsLoading();
        drawingEventDate(user, event, d.schedule, (e: CurrentEvent) => {
          eventUpdatedHandler(e);
          ctx.setAsNotLoading();
        });
      })}
    >
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
      <Submit label="抽選" />
    </form>
  );
};
