import { FC, useContext } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Submit } from "ui/src/components/Submit";
import { Step } from "ui/src/components/Step";
import { FormError } from "ui/src/components/FormError";
import { DatePicker } from "./DatePicker";
import { Date } from "domain/src/model/event/date";
import { User } from "domain/src/model/user";
import { Site } from "infra/src/web/site";
import { ErrorMessage } from "@hookform/error-message";
import { client } from "infra/src/client/trpc";
import { eventMaxDate } from "domain/src/service/event";
import { loadingContext } from "@/hooks/useLoading";
import { useEventForm } from "../hooks/useEventForm";
import { CurrentEventArgs } from "domain/src/model/event";

interface Props {
  user: User;
  eventCreatedHandler: (args: {
    event: CurrentEventArgs;
    user: {
      uuid: string;
      token: string;
    };
  }) => void;
}

type EventUpsert = {
  name: string;
  schedule: { date: string; value: string; dateObj: Date }[];
};

export const EventCreateForm: FC<Props> = ({ eventCreatedHandler, user }) => {
  const ctx = useContext(loadingContext);

  const publish = async (event: EventUpsert) => {
    ctx.setAsLoading();
    const result = await client.event.createEvent.mutate({
      user: user.getAuthInfo(),
      event: event,
    });
    ctx.setAsNotLoading();
    if (result.event) {
      eventCreatedHandler(result);
    } else {
      console.error(result);
    }
  };

  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm();

  const today = Date.today();
  return (
    <form onSubmit={handleSubmit((d) => publish(d))}>
      <Step number={1}>{Site.message.form.event.name}</Step>
      <TextBox>
        <input
          type="text"
          placeholder={Site.eventPlaceholder}
          {...register("name")}
        />
      </TextBox>
      <FormError>
        <ErrorMessage errors={errors} name="name" />
      </FormError>
      <Step number={2}>{Site.message.form.event.calendar}</Step>
      <DatePicker
        dateList={dateList}
        range={{ min: today, max: eventMaxDate(today) }}
        setDateHandler={setDateHandler}
      />
      <FormError>
        <ErrorMessage errors={errors} name="schedule" />
      </FormError>
      <Submit label="作成" />
    </form>
  );
};