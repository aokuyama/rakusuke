import { FC } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { DatePicker } from "./DatePicker";
import { UpcomingEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";
import { ErrorMessage } from "@hookform/error-message";
import { EventUpsert, useEventForm } from "./useEventForm";
import { Submit } from "ui/src/components/Submit";

interface Props {
  user: User;
  event: UpcomingEvent;
  eventUpdatedHandler: (event: UpcomingEvent) => void;
}

export const EventUpdateForm: FC<Props> = ({
  user,
  event,
  eventUpdatedHandler,
}) => {
  const publish = async (e: EventUpsert) => {
    const auth = user.getAuthInfo();
    if (!auth) {
      throw new Error("forbidden");
    }
    const result = await client.event.updateEvent.mutate({
      user: auth,
      event: Object.assign(e, { path: event.path }),
    });
    if (result.event) {
      eventUpdatedHandler(UpcomingEvent.new(result.event));
    } else {
      console.error(result);
    }
  };
  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm(event);

  return (
    <form onSubmit={handleSubmit((d) => publish(d))}>
      <TextBox>
        <input type="text" {...register("name")} />
      </TextBox>
      <ErrorMessage errors={errors} name="name" />
      <DatePicker dateList={dateList} setDateHandler={setDateHandler} />
      <ErrorMessage errors={errors} name="schedule" />
      <Submit label="更新" />
    </form>
  );
};
