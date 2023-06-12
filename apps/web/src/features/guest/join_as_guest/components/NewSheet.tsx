import { FC, useContext } from "react";
import { CurrentEvent } from "domain/src/model/event";
import { GuestForm } from "./GuestForm";
import { loadingContext } from "@/hooks/useLoading";
import { GuestUpsert, useGuestForm } from "../hooks/useGuestForm";
import { GuestDefault } from "domain/src/model/guest/default";
import { createGuestApi } from "../api/trpc";
import { Site } from "infra/src/web/site";
import { useToast } from "@/hooks/useToast";

interface Props {
  event: CurrentEvent;
  guest: {
    guestDefault: GuestDefault | undefined;
    setGuestDefault: (guest: GuestDefault) => void;
  };
  eventUpdatedHandler: (event: CurrentEvent) => void;
}

export const NewSheet: FC<Props> = ({ event, guest, eventUpdatedHandler }) => {
  const ctx = useContext(loadingContext);
  const toast = useToast();

  const submit = async (g: GuestUpsert) => {
    ctx.setAsLoading();
    const loading = toast.loading("参加希望日入力中...");
    createGuestApi(event, g, {
      success: (r) => {
        loading.success(r.guest.name + " として参加希望日を入力しました");
        guest.setGuestDefault(r.guest.toDefault());
        eventUpdatedHandler(r.event);
      },
      error: (r) => {
        loading.error(Site.message.form.common.error);
        console.error(r);
      },
      finally: () => {
        ctx.setAsNotLoading();
      },
    });
  };

  const defaultValues = {
    name: guest.guestDefault ? guest.guestDefault.name : "",
    memo: "",
    attendance: event.newAttendance().value,
  };

  return (
    <GuestForm
      dateList={event._schedules.dates()}
      onSubmit={submit}
      form={useGuestForm(defaultValues)}
    />
  );
};
