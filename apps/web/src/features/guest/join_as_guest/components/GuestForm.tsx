import { FC, useContext } from "react";
import { Date } from "domain/src/model/date";
import { TextBox } from "ui/src/components/TextBox";
import { FormError } from "ui/src/components/FormError";
import { GuestUpsert } from "../hooks/useGuestForm";
import { ErrorMessage } from "@hookform/error-message";
import { Submit } from "ui/src/components/Submit";
import { ToggleListItem } from "ui/src/components/ToggleListItem";
import { ToggleList } from "ui/src/components/ToggleList";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Step } from "ui/src/components/Step";
import { Site } from "infra/src/web/site";
import { loadingContext } from "@/hooks/useLoading";

interface Props {
  dateList: Date[];
  onSubmit: (guest: GuestUpsert) => Promise<void>;
  form: {
    register: UseFormRegister<GuestUpsert>;
    handleSubmit: UseFormHandleSubmit<GuestUpsert>;
    errors: FieldErrors<GuestUpsert>;
  };
}

export const GuestForm: FC<Props> = ({ dateList, onSubmit, form }) => {
  const loadingCtx = useContext(loadingContext);
  const { register, handleSubmit, errors } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Step number={1}>{Site.message.form.guest.name}</Step>
      <TextBox>
        <input type="text" {...register("name")} />
      </TextBox>
      <FormError>
        <ErrorMessage errors={errors} name="name" />
      </FormError>
      <Step number={2}>{Site.message.form.guest.calendar}</Step>
      <ToggleList>
        {dateList.map((date, index) => {
          return (
            <ToggleListItem name={date.short()} key={index}>
              <input
                type="checkbox"
                {...register(`attendance.${index}.attend` as const)}
              ></input>
            </ToggleListItem>
          );
        })}
      </ToggleList>
      {dateList.map((date, index) => {
        return (
          <input
            key={index}
            type="hidden"
            {...register(`attendance.${index}.date` as const)}
            value={date.toString()}
          ></input>
        );
      })}
      <FormError>
        <ErrorMessage errors={errors} name="schedule" />
      </FormError>
      <Step number={3}>{Site.message.form.guest.memo}</Step>
      <TextBox>
        <input type="text" {...register("memo")} />
      </TextBox>
      <Submit
        label="決定"
        decorationRight="arrow-right"
        disabled={loadingCtx.loading}
      />
    </form>
  );
};
