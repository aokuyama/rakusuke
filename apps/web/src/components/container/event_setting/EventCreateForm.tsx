import { FC } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Submit } from "ui/src/components/Submit";
import { Step } from "ui/src/components/Step";
import { DatePicker } from "./DatePicker";
import { Date } from "domain/src/model/event/date";
import { User } from "domain/src/model/user";
import { Site } from "@/registry";
import { ErrorMessage } from "@hookform/error-message";
import { client } from "infra/src/client/trpc";
import { useEventForm } from "./useEventForm";

interface Props {
  user: User;
  eventCreatedHandler: (args: {
    path: string;
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
  const publish = async (event: EventUpsert) => {
    const result = await client.event.createEvent.mutate({
      user: user.getAuthInfo(),
      event: event,
    });
    if (result.path) {
      eventCreatedHandler(result);
    } else {
      console.error(result);
    }
  };

  const { register, handleSubmit, setDateHandler, dateList, errors } =
    useEventForm();

  return (
    <form onSubmit={handleSubmit((d) => publish(d))}>
      <Step>1. 会の名前を教えてください</Step>
      <TextBox>
        <input
          type="text"
          placeholder={Site.eventPlaceholder}
          {...register("name")}
        />
      </TextBox>
      <ErrorMessage errors={errors} name="name" />
      <Step>2. 候補日はいつですか？</Step>
      <DatePicker dateList={dateList} setDateHandler={setDateHandler} />
      <ErrorMessage errors={errors} name="schedule" />
      <Submit label="作成" />
    </form>
  );
};
