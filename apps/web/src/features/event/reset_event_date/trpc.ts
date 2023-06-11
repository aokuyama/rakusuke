import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

export const resetEventDate = async (
  user: User,
  event: CurrentEvent,
  eventUpdatedHandler: (event: CurrentEvent) => void
) => {
  const auth = user.getAuthInfo();
  if (!auth) {
    throw new Error("forbidden");
  }
  const result = await client.event.resetEventDate.mutate({
    user: auth,
    event: { path: event.path },
  });
  if (result.event) {
    eventUpdatedHandler(CurrentEvent.new(result.event));
  } else {
    console.error(result);
  }
};
