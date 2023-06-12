import { FC, useContext } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { TextArea } from "ui/src/components/TextArea";
import { FormError } from "ui/src/components/FormError";
import { DatePickCalendar } from "../../create_event/components/DatePickCalendar";
import { PickedDates } from "../../create_event/components/PickedDates";
import { CurrentEvent } from "domain/src/model/event";
import { ErrorMessage } from "@hookform/error-message";
import {
  EventUpsert,
  useEventForm,
} from "../../create_event/hooks/useEventForm";
import { Submit } from "ui/src/components/Submit";
import { userContext } from "@/hooks/useUser";
import { loadingContext } from "@/hooks/useLoading";
import { Site } from "infra/src/web/site";
import { Step } from "ui/src/components/Step";
import { updateEventApi } from "../api/trpc";
import { useToast } from "@/hooks/useToast";

interface Props {
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const EventUpdateForm: FC<Props> = ({ event, eventUpdatedHandler }) => {
  const user = useContext(userContext).user;
  const loadingCtx = useContext(loadingContext);
  const toast = useToast();
  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm(event);

  if (!user) {
    return <></>;
  }

  const submit = async (e: EventUpsert) => {
    if (!user.isRegistered()) {
      throw new Error("forbidden");
    }
    loadingCtx.setAsLoading();
    const loading = toast.loading("更新中...");
    updateEventApi(user, event.getPath(), e, {
      success: (r) => {
        loading.success("イベント " + r.name + " を更新しました");
        eventUpdatedHandler(r);
      },
      error: (r) => {
        loading.error(Site.message.form.common.error);
        console.error(r);
      },
      finally: () => {
        loadingCtx.setAsNotLoading();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Step number={1}>{Site.message.form.event.name}</Step>
      <TextBox>
        <input type="text" {...register("name")} />
      </TextBox>
      <FormError>
        <ErrorMessage errors={errors} name="name" />
      </FormError>
      <Step number={2}>{Site.message.form.event.calendar}</Step>
      <DatePickCalendar
        dateList={dateList}
        range={{ min: event.minDate(), max: event.maxDate() }}
        setDateHandler={setDateHandler}
      />
      <FormError>
        <ErrorMessage errors={errors} name="schedule" />
      </FormError>
      <Submit
        label="更新"
        decorationRight="arrow-right"
        disabled={!event.isOrganizer}
      />
      <Step number={3}>{Site.message.form.event.description}</Step>
      <TextArea>
        <textarea {...register("description")} />
      </TextArea>
      <PickedDates dateList={dateList} />
    </form>
  );
};
