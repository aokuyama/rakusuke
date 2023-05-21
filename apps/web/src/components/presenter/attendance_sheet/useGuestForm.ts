import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guestCreateSchema } from "infra/src/client/trpc/validation/guest";
import { EventGuest } from "domain/src/model/guest";
import { UpcomingEvent } from "domain/src/model/event";

export const useGuestForm = (def?: {
  event: UpcomingEvent;
  guest: EventGuest;
}) => {
  const defaultValues = def
    ? {
        name: def.guest.name,
        attendance: def.event.newAttendanceByGuest(def.guest).value,
      }
    : undefined;
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
