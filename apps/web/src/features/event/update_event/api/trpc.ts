import { RegisteredUser } from "domain/src/model/user";
import { EventUpsert } from "../../create_event/hooks/useEventForm";
import { client } from "infra/src/client/trpc";
import { CurrentEvent, EventPath } from "domain/src/model/event";

export const updateEventApi = async (
  user: RegisteredUser,
  eventPath: EventPath,
  event: EventUpsert,
  then: {
    success: (event: CurrentEvent) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  }
) => {
  const result = await client.event.updateEvent.mutate({
    user: user.getAuthInfo(),
    event: Object.assign(event, { path: eventPath.value }),
  });
  if (result.event) {
    then.success(CurrentEvent.new(result.event));
  } else {
    then.error(result);
  }
  then.finally(result);
};
