import { FC, useContext } from "react";
import { Box } from "ui/src/components/Box";
import { Name } from "ui/src/components/Name";
import { Date } from "domain/src/model/date";
import { Button } from "ui/src/components/Button";
import { loadingContext } from "@/hooks/useLoading";
import { CurrentEvent } from "domain/src/model/event";
import { userContext } from "@/hooks/useUser";
import { useToast } from "@/hooks/useToast";
import { decideOnEventDateApi } from "@/features/event/decide_on_event_date/api/trpc";
import { resetEventDateApi } from "@/features/event/reset_event_date/api/trpc";
import { Site } from "infra/src/web/site";

interface Props {
  args: {
    date: Date;
    selected: boolean;
    attendees: {
      name: string;
    }[];
  };
  closeHandler: () => void;
  event: CurrentEvent;
  eventUpdatedHandler: (date: CurrentEvent) => void;
}

export const FocusDay: FC<Props> = ({
  args,
  closeHandler,
  event,
  eventUpdatedHandler,
}) => {
  const user = useContext(userContext).user;
  const loadingCtx = useContext(loadingContext);
  const toast = useToast();

  const decideHandler = user
    ? (date: Date | undefined) => {
        loadingCtx.setAsLoading();
        const loading = toast.loading("更新中...");
        const api = date
          ? (then: {
              success: (args: { event: CurrentEvent }) => void;
              error: (result: any) => void;
              finally: (result: any) => void;
            }) => {
              decideOnEventDateApi(user, event, date, then);
            }
          : (then: {
              success: (args: { event: CurrentEvent }) => void;
              error: (result: any) => void;
              finally: (result: any) => void;
            }) => {
              resetEventDateApi(user, event, then);
            };

        api({
          success: (r) => {
            const held = r.event.heldDate();
            loading.success(
              r.event.name +
                " の開催日を " +
                (held ? held.short() + " に" : "リセット") +
                "しました"
            );
            eventUpdatedHandler(r.event);
          },
          error: (r) => {
            loading.error(Site.message.form.common.error);
            console.error(r);
          },
          finally: () => {
            loadingCtx.setAsNotLoading();
          },
        });
      }
    : undefined;

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
      {event.isOrganizer &&
        decideHandler &&
        (!args.selected ? (
          <Button
            isPrimary={true}
            onClick={() => decideHandler(args.date)}
            decorationRight="arrow-right"
            disabled={loadingCtx.loading}
          >
            開催日にする
          </Button>
        ) : (
          <Button
            isPrimary={true}
            onClick={() => decideHandler(undefined)}
            decorationRight="arrow-right"
            disabled={loadingCtx.loading}
          >
            開催日をリセット
          </Button>
        ))}
    </Box>
  );
};
