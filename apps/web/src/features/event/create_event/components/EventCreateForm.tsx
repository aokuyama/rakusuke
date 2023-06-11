import { FC, useContext } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { TextArea } from "ui/src/components/TextArea";
import { Submit } from "ui/src/components/Submit";
import { Step } from "ui/src/components/Step";
import { FormError } from "ui/src/components/FormError";
import { DatePickCalendar } from "./DatePickCalendar";
import { PickedDates } from "./PickedDates";
import { Date } from "domain/src/model/date";
import { Site } from "infra/src/web/site";
import { ErrorMessage } from "@hookform/error-message";
import { eventMaxDate } from "domain/src/service/event";
import { userContext } from "@/hooks/useUser";
import { loadingContext } from "@/hooks/useLoading";
import { useEventForm } from "../hooks/useEventForm";
import { CurrentEventArgs } from "domain/src/model/event";
import { createEventApi } from "../api/trpc";
import { useToast } from "@/hooks/useToast";

interface Props {
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
  description: string;
  schedule: { date: string; value: string; dateObj: Date }[];
};

export const EventCreateForm: FC<Props> = ({ eventCreatedHandler }) => {
  const ctx = useContext(loadingContext);
  const user = useContext(userContext).user;
  const toast = useToast();

  const submit = async (event: EventUpsert) => {
    if (!user) {
      throw new Error("user not found");
    }
    ctx.setAsLoading();
    createEventApi(user, event, {
      success: (r) => {
        toast.success("イベント " + r.event.name + " を作成しました");
        eventCreatedHandler(r);
      },
      error: (r) => {
        toast.error(Site.message.form.common.error);
        console.error(r);
      },
      finally: () => {
        ctx.setAsNotLoading();
      },
    });
  };

  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm();

  const today = Date.today();
  return (
    <form onSubmit={handleSubmit(submit)}>
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
      <DatePickCalendar
        dateList={dateList}
        range={{ min: today, max: eventMaxDate(today) }}
        setDateHandler={setDateHandler}
      />
      <FormError>
        <ErrorMessage errors={errors} name="schedule" />
      </FormError>
      <Submit label="作成" disabled={!user} decorationRight="arrow-right" />
      <Step number={3}>{Site.message.form.event.description}</Step>
      <TextArea>
        <textarea {...register("description")} />
      </TextArea>
      <PickedDates dateList={dateList} />
    </form>
  );
};
