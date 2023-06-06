import { FC } from "react";
import { Box } from "ui/src/components/Box";
import { Name } from "ui/src/components/Name";
import { Date } from "domain/src/model/event/date";
import { Button } from "ui/src/components/Button";

interface Props {
  args: {
    date: Date;
    attendees: {
      name: string;
    }[];
  };
  closeHandler: () => void;
  buttonClickHandler?: (date: Date) => void;
}

export const FocusDay: FC<Props> = ({
  args,
  closeHandler,
  buttonClickHandler,
}) => {
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
      {buttonClickHandler && (
        <Button onClick={() => buttonClickHandler(args.date)}>
          この日に確定
        </Button>
      )}
    </Box>
  );
};
