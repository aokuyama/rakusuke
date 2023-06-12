import { FC, useContext } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { EventGuest } from "domain/src/model/guest";
import { GuestForm } from "../../join_as_guest/components/GuestForm";
import { loadingContext } from "@/hooks/useLoading";
import {
  GuestUpsert,
  useGuestForm,
} from "../../join_as_guest/hooks/useGuestForm";
import { updateGuestApi } from "../api/trpc";
import { Site } from "infra/src/web/site";
import { useToast } from "@/hooks/useToast";

interface Props {
  guest: EventGuest;
  event: CurrentEvent;
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const UpdateSheet: FC<Props> = ({
  guest,
  event,
  eventUpdatedHandler,
}) => {
  const ctx = useContext(loadingContext);
  const toast = useToast();

  const submit = async (g: GuestUpsert) => {
    ctx.setAsLoading();
    updateGuestApi(event, guest.getNumber(), g, {
      success: (r) => {
        toast.success(r.guest.name + " の情報を更新しました");
        eventUpdatedHandler(r.event);
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

  const defaultValues = {
    name: guest.name,
    memo: guest.memo ? guest.memo : "",
    attendance: event.newAttendanceByGuest(guest).value,
  };

  return (
    <GuestForm
      dateList={event._schedules.dates()}
      onSubmit={submit}
      form={useGuestForm(defaultValues)}
    />
  );
};
