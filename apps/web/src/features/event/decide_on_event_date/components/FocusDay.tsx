import { FC } from "react";
import { Box } from "ui/src/components/Box";
import { Name } from "ui/src/components/Name";
import { Date } from "domain/src/model/date";
import { Button } from "ui/src/components/Button";

interface Props {
  args: {
    date: Date;
    selected: boolean;
    attendees: {
      name: string;
    }[];
  };
  closeHandler: () => void;
  buttonClickHandler?: (date: Date | undefined) => void;
}

export const FocusDay: FC<Props> = ({
  args,
  closeHandler,
  buttonClickHandler,
}) => {
  return (
    <Box
      name={args.date.short() + (args.selected ? " 開催決定" : "")}
      button={{
        closeHandler: closeHandler,
      }}
    >
      {args.attendees.map((attendee, index) => {
        return <Name key={index}>{attendee.name}</Name>;
      })}
      {buttonClickHandler &&
        (!args.selected ? (
          <Button
            isPrimary={true}
            onClick={() => buttonClickHandler(args.date)}
            decorationRight="arrow-right"
          >
            開催日にする
          </Button>
        ) : (
          <Button
            isPrimary={true}
            onClick={() => buttonClickHandler(undefined)}
            decorationRight="arrow-right"
          >
            開催日をリセット
          </Button>
        ))}
    </Box>
  );
};
