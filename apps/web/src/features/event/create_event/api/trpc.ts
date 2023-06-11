import { User } from "domain/src/model/user";
import { EventUpsert } from "../hooks/useEventForm";
import { client } from "infra/src/client/trpc";
import { CurrentEventArgs } from "domain/src/model/event";

export const createEventApi = async (
  user: User,
  event: EventUpsert,
  then: {
    success: (args: {
      event: CurrentEventArgs;
      user: {
        uuid: string;
        token: string;
      };
    }) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  }
) => {
  const result = await client.event.createEvent.mutate({
    user: user.getAuthInfo(),
    event: event,
  });
  if (result.event) {
    then.success(result);
  } else {
    then.error(result);
  }
  then.finally(result);
};
