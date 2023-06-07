import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

export const drawingEventDate = async (
  user: User,
  event: CurrentEvent,
  schedule: {
    date: string;
    enable: boolean;
  }[],
  eventUpdatedHandler: (event: CurrentEvent) => void
) => {
  const auth = user.getAuthInfo();
  if (!auth) {
    throw new Error("forbidden");
  }
  const result = await client.event.drawingEventDate.mutate({
    user: auth,
    event: { path: event.path, schedule: schedule },
  });
  if (result.event) {
    eventUpdatedHandler(CurrentEvent.new(result.event));
  } else {
    console.error(result);
  }
};
