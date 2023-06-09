import { FC, useContext } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { FormError } from "ui/src/components/FormError";
import { DatePicker } from "../../create_event/components/DatePicker";
import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
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

interface Props {
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const EventUpdateForm: FC<Props> = ({ event, eventUpdatedHandler }) => {
  const user = useContext(userContext).user;
  const loadingCtx = useContext(loadingContext);
  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm(event);

  if (!user) {
    return <></>;
  }

  const publish = async (e: EventUpsert) => {
    const auth = user.getAuthInfo();
    if (!auth) {
      throw new Error("forbidden");
    }
    loadingCtx.setAsLoading();
    const result = await client.event.updateEvent.mutate({
      user: auth,
      event: Object.assign(e, { path: event.path }),
    });
    loadingCtx.setAsNotLoading();
    if (result.event) {
      eventUpdatedHandler(CurrentEvent.new(result.event));
    } else {
      console.error(result);
    }
  };

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
      <Submit label="更新" decorationRight="arrow-right" />
    </form>
  );
};
