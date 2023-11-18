import { CurrentEvent } from "domain/src/model/event";
import { Date } from "domain/src/model/date";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

export const decideOnEventDateApi = async (
  user: User,
  event: CurrentEvent,
  heldDate: Date,
  then: {
    success: (args: { event: CurrentEvent }) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  },
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
    then.success({ event: CurrentEvent.new(result.event) });
  } else {
    then.error(result);
  }
  then.finally(result);
};
