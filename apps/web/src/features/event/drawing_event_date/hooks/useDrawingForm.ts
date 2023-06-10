import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { drawingSchema } from "infra/src/client/trpc/validation/event";
import { Date } from "domain/src/model/date";

export const useDrawingForm = (
  schedules: { id: string; date: Date; length: number; strong: boolean }[]
) => {
  const defaultValues = {
    schedule: schedules.map((schedule) => {
      return { date: schedule.date.toString(), enable: schedule.strong };
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

type DrawingFormSchema = {
  schedule: { date: string; enable: boolean }[];
};
