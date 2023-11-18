import { Date } from "domain/src/model/date";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "../../../../hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventCreateSchema } from "infra/src/client/trpc/validation/event";
import { CurrentEvent } from "domain/src/model/event";
import { DateList } from "domain/src/model/event/date_list";
import { useState } from "react";

export const useEventForm = (defaultEvent?: CurrentEvent) => {
  const toast = useToast();
  const [cautioned, setCautioned] = useState(false);

  const defaultValues = defaultEvent
    ? {
        name: defaultEvent.name,
        description: defaultEvent.description,
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
    if (fields.length >= DateList.MAX) {
      // 限度数を超えて選択させない
      if (!cautioned) {
        toast.error("選択できる日付は " + DateList.MAX + " 個までです");
        setCautioned(true);
      }
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
  description: string;
  schedule: { date: string; value: string; dateObj: Date }[];
};

const toSchedule = (date: Date) => {
  return {
    value: date.toString(),
    dateObj: date,
    date: date.toString(),
  };
};
