import { RegisteredUser, User } from "domain/src/model/user";
import { EventUpsert } from "../hooks/useEventForm";
import { client } from "infra/src/client/trpc";
import { CurrentEvent } from "domain/src/model/event";

export const createEventApi = async (
  user: User,
  event: EventUpsert,
  then: {
    success: (args: { event: CurrentEvent; user: RegisteredUser }) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  },
) => {
  const result = await client.event.createEvent.mutate({
    user: user.getAuthInfo(),
    event: event,
  });
  if (result.event) {
    then.success({
      event: CurrentEvent.new(result.event),
      user: RegisteredUser.new(result.user),
    });
  } else {
    then.error(result);
  }
  then.finally(result);
};
