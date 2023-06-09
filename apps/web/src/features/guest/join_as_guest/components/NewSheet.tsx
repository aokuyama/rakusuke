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
  submitedHandler?: () => void;
}

export const NewSheet: FC<Props> = ({
  event,
  guest,
  eventUpdatedHandler,
  submitedHandler,
}) => {
  const ctx = useContext(loadingContext);
  const toast = useToast();

  const submit = async (g: GuestUpsert) => {
    ctx.setAsLoading();
    const loading = toast.loading("作成中...");
    createGuestApi(event, g, {
      submited: (r) => {
        eventUpdatedHandler(r.event);
        submitedHandler ? submitedHandler() : undefined;
      },
      success: (r) => {
        loading.success(r.guest.name + " として参加を受け付けました");
        guest.setGuestDefault(r.guest.toDefault());
        eventUpdatedHandler(r.event);
      },
      error: (err, r) => {
        eventUpdatedHandler(r.event);
        loading.error(Site.message.form.common.error);
        console.error(err);
      },
      finally: () => {
        ctx.setAsNotLoading();
      },
    });
  };

  const defaultValues = {
    name: guest.guestDefault ? guest.guestDefault.name : "",
    memo: "",
    attendance: event.newAttendance().serialize(),
  };

  return (
    <GuestForm
      dateList={event._schedules.dates()}
      onSubmit={submit}
      form={useGuestForm(defaultValues)}
    />
  );
};
