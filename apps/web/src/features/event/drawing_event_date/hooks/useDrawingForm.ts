import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { drawingSchema } from "infra/src/client/trpc/validation/event";
import { Date } from "domain/src/model/date";

export const useDrawingForm = (
  schedules: { date: Date; enable: boolean }[],
) => {
  const defaultValues = {
    schedule: schedules.map((schedule) => {
      return { date: schedule.date.toString(), enable: schedule.enable };
    }),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DrawingFormSchema>({
    resolver: zodResolver(drawingSchema),
    defaultValues: defaultValues,
  });

  return { register, handleSubmit, errors };
};

export type DrawingFormSchema = {
  schedule: { date: string; enable: boolean }[];
};
