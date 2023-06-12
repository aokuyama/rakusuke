import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

export const resetEventDateApi = async (
  user: User,
  event: CurrentEvent,
  then: {
    success: (args: { event: CurrentEvent }) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  }
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
    then.success({ event: CurrentEvent.new(result.event) });
  } else {
    then.error(result);
  }
  then.finally(result);
};
