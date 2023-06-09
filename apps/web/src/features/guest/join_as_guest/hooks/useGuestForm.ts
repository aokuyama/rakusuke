import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guestCreateSchema } from "infra/src/client/trpc/validation/guest";

export const useGuestForm = (defaultValues: GuestUpsert) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestUpsert>({
    resolver: zodResolver(guestCreateSchema),
    defaultValues: defaultValues,
  });

  return { register, handleSubmit, errors };
};

export type GuestUpsert = {
  name: string;
  attendance: { date: string; attend: boolean }[];
};
