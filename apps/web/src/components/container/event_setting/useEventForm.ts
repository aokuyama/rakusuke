import { Date } from "domain/src/model/event/date";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventCreateSchema } from "infra/src/client/trpc/validation/event";
import { UpcomingEvent } from "domain/src/model/event";

export const useEventForm = (defaultEvent?: UpcomingEvent) => {
  const defaultValues = defaultEvent
    ? {
        name: defaultEvent.name,
        schedule: defaultEvent._schedules.dates().map((d) => toSchedule(d)),
      }
    : undefined;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventUpsert>({
    resolver: zodResolver(eventCreateSchema),
    defaultValues: defaultValues,
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
    append(toSchedule(date));
  };

  const dateList = fields
    .map((field) => {
      return field.dateObj;
    })
    .sort((a, b) => a.unixtime() - b.unixtime());

  return { register, handleSubmit, setDateHandler, dateList, errors };
};

export type EventUpsert = {
  name: string;
  schedule: { date: string; value: string; dateObj: Date }[];
};

const toSchedule = (date: Date) => {
  return {
    value: date.toString(),
    dateObj: date,
    date: date.toString(),
  };
};
