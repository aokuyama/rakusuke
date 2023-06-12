import { RegisteredUser } from "domain/src/model/user";
import { EventUpsert } from "../../create_event/hooks/useEventForm";
import { client } from "infra/src/client/trpc";
import { CurrentEvent } from "domain/src/model/event";

export const updateEventApi = async (
  user: RegisteredUser,
  event: EventUpsert,
  currentEvent: CurrentEvent,
  then: {
    submited: (args: { event: CurrentEvent }) => void;
    success: (args: { event: CurrentEvent }) => void;
    error: (result: any, args: { event: CurrentEvent }) => void;
    finally: (result: any) => void;
  }
) => {
  const eventData = Object.assign(event, { path: currentEvent.path });
  if (then.submited) {
    // 仮に全部が非開催日のデータとして作る
    const tmpSchedule = event.schedule.map((s) => {
      return Object.assign(s, { held: false });
    });
    then.submited({
      event: currentEvent.updatedEvent({
        name: event.name,
        description: event.description,
        schedule: tmpSchedule,
      }),
    });
  }

  const result = await client.event.updateEvent.mutate({
    user: user.getAuthInfo(),
    event: eventData,
  });
  if (result.event) {
    then.success({ event: CurrentEvent.new(result.event) });
  } else {
    then.error(result, { event: currentEvent });
  }
  then.finally(result);
};
