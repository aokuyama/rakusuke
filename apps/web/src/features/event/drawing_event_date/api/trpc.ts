import { CurrentEvent } from "domain/src/model/event";
import { client } from "infra/src/client/trpc";
import { User } from "domain/src/model/user";

export const drawingEventDateApi = async (
  user: User,
  event: CurrentEvent,
  schedule: {
    date: string;
    enable: boolean;
  }[],
  then: {
    submited: () => void;
    success: (args: { event: CurrentEvent }) => void;
    error: (result: any) => void;
    finally: (result: any) => void;
  }
) => {
  const auth = user.getAuthInfo();
  if (!auth) {
    throw new Error("forbidden");
  }
  if (then.submited) {
    then.submited();
  }
  const result = await client.event.drawingEventDate.mutate({
    user: auth,
    event: { path: event.path, schedule: schedule },
  });

  if (result.event) {
    then.success({ event: CurrentEvent.new(result.event) });
  } else {
    then.error(result);
  }
  then.finally(result);
};
