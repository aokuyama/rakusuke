import { FC } from "react";
import { Box } from "ui/src/components/Box";
import { Name } from "ui/src/components/Name";
import { Date } from "domain/src/model/event/date";

interface Props {
  args: {
    date: Date;
    attendees: {
      name: string;
    }[];
  };
  closeHandler: () => void;
}

export const FocusDay: FC<Props> = ({ args, closeHandler }) => {
  return (
    <Box
      name={args.date.short()}
      button={{
        closeHandler: closeHandler,
      }}
    >
      {args.attendees.map((attendee, index) => {
        return <Name key={index}>{attendee.name}</Name>;
      })}
    </Box>
  );
};
