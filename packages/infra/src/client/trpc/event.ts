import { NewEvent } from "domain/src/model/event/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from ".";

export class EventTRPC implements EventRepository {
  createEvent = async (event: NewEvent) => {
    await client.eventCreate.mutate({ name: event.name });
    return event.path;
  };
}
