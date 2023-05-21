import { FC } from "react";
import { TextBox } from "ui/src/components/TextBox";
import { Submit } from "ui/src/components/Submit";
import { Step } from "ui/src/components/Step";
import { DatePicker } from "./DatePicker";
import { Date } from "domain/src/model/event/date";
import { User } from "domain/src/model/user";
import { Site } from "@/registry";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { eventCreateSchema } from "infra/src/client/trpc/validation/event";
import { client } from "infra/src/client/trpc";

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

type EventCreate = {
  name: string;
  schedule: { date: string; value: string; dateObj: Date }[];
};

export const EventCreateForm: FC<Props> = ({ eventCreatedHandler, user }) => {
  const publish = async (d: EventCreate) => {
    const result = await client.event.createEvent.mutate({
      user: user.getAuthInfo(),
      event: d,
    });
    if (result.path) {
      eventCreatedHandler(result);
    } else {
      console.error(result);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventCreate>({
    resolver: zodResolver(eventCreateSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "schedule",
    control,
  });
  const setDateHandler = (date: Date) => {
    let removed = false;
    fields.forEach((field, index) => {
      if (date.isEqual(field.dateObj)) {
        remove(index);
        removed = true;
      }
    });
    if (removed) {
      return;
    }
    append({
      value: date.toString(),
      dateObj: date,
      date: date.toString(),
    });
  };
  const strList = fields.map((field) => {
    return field.dateObj;
  });

  return (
    <form onSubmit={handleSubmit((d) => publish(d))}>
      <ErrorMessage errors={errors} name="user" />
      <Step>1. 会の名前を教えてください</Step>
      <TextBox>
        <input
          type="text"
          placeholder={Site.eventPlaceholder}
          {...register("name")}
        />
      </TextBox>
      {fields.map((field, index) => {
        return (
          <input
            type="hidden"
            key={field.id}
            {...register(`schedule.${index}.value`)}
          />
        );
      })}
      <ErrorMessage errors={errors} name="name" />
      <Step>2. 候補日はいつですか？</Step>
      <DatePicker dateList={strList} setDateList={setDateHandler} />
      <ErrorMessage errors={errors} name="schedule" />
      <Submit label="作成" />
    </form>
  );
};
