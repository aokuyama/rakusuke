import { FC, useContext } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { FormError } from "ui/src/components/FormError";
import { DatePicker } from "../../create_event/components/DatePicker";
import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";
import { ErrorMessage } from "@hookform/error-message";
import {
  EventUpsert,
  useEventForm,
} from "../../create_event/hooks/useEventForm";
import { Submit } from "ui/src/components/Submit";
import { loadingContext } from "@/hooks/useLoading";
import { Site } from "infra/src/web/site";
import { Step } from "ui/src/components/Step";

interface Props {
  user: User;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const EventUpdateForm: FC<Props> = ({
  user,
  event,
  eventUpdatedHandler,
}) => {
  const ctx = useContext(loadingContext);

  const publish = async (e: EventUpsert) => {
    const auth = user.getAuthInfo();
    if (!auth) {
      throw new Error("forbidden");
    }
    ctx.setAsLoading();
    const result = await client.event.updateEvent.mutate({
      user: auth,
      event: Object.assign(e, { path: event.path }),
    });
    ctx.setAsNotLoading();
    if (result.event) {
      eventUpdatedHandler(CurrentEvent.new(result.event));
    } else {
      console.error(result);
    }
  };
  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm(event);

  return (
    <form onSubmit={handleSubmit((d) => publish(d))}>
      <Step number={1}>{Site.message.form.event.name}</Step>
      <TextBox>
        <input type="text" {...register("name")} />
      </TextBox>
      <FormError>
        <ErrorMessage errors={errors} name="name" />
      </FormError>
      <Step number={2}>{Site.message.form.event.calendar}</Step>
      <DatePicker
        dateList={dateList}
        range={{ min: event.minDate(), max: event.maxDate() }}
        setDateHandler={setDateHandler}
      />
      <FormError>
        <ErrorMessage errors={errors} name="schedule" />
      </FormError>
      <Submit label="更新" />
    </form>
  );
};
