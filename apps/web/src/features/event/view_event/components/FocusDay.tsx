import { FC } from "react";
import { EditBox } from "ui/src/components/EditBox";
import { Name } from "ui/src/components/Name";
import { Date } from "domain/src/model/event/date";

interface Props {
  args: {
    date: Date;
    attendees: {
      name: string;
    }[];
  };
}

export const FocusDay: FC<Props> = ({ args }) => {
  return (
    <>
      <EditBox name={args.date.short()}>
        {args.attendees.map((attendee, index) => {
          return <Name key={index}>{attendee.name}</Name>;
        })}
      </EditBox>
    </>
  );
};
