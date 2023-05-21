import { FC } from "react";
import { Date } from "domain/src/model/event/date";
import { TextBox } from "ui/src/components/TextBox";
import { GuestUpsert } from "./useGuestForm";
import { ErrorMessage } from "@hookform/error-message";
import { Submit } from "ui/src/components/Submit";
import { ToggleListItem } from "ui/src/components/ToggleListItem";
import { ToggleList } from "ui/src/components/ToggleList";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  dateList: Date[];
  onSubmit: (guest: GuestUpsert) => Promise<void>;
  form: {
    register: UseFormRegister<GuestUpsert>;
    handleSubmit: UseFormHandleSubmit<GuestUpsert>;
    errors: FieldErrors<GuestUpsert>;
  };
}

export const Form: FC<Props> = ({ dateList, onSubmit, form }) => {
  const { register, handleSubmit, errors } = form;

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <TextBox>
        <input type="text" {...register("name")} />
      </TextBox>
      <ErrorMessage errors={errors} name="name" />
      <ToggleList>
        {dateList.map((date, index) => {
          return (
            <ToggleListItem name={date.toString()} key={index}>
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
      <ErrorMessage errors={errors} name="schedule" />
      <Submit label="決定" />
    </form>
  );
};
