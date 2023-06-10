import { CurrentEvent } from "domain/src/model/event";
import { Date } from "domain/src/model/date";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

export const decideOnEventDate = async (
  user: User,
  event: CurrentEvent,
  heldDate: Date,
  eventUpdatedHandler: (event: CurrentEvent) => void
) => {
  const auth = user.getAuthInfo();
  if (!auth) {
    throw new Error("forbidden");
  }
  const result = await client.event.decideOnEventDate.mutate({
    user: auth,
    event: { path: event.path, date: heldDate.toString() },
  });
  if (result.event) {
    eventUpdatedHandler(CurrentEvent.new(result.event));
  } else {
    console.error(result);
  }
};
