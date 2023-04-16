import { NewEvent } from "domain/src/model/event/event";
import { EventRepository } from "domain/src/model/event/repository";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent) => {
    return event.path;
  };
}
