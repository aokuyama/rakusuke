import { NewEvent } from "domain/src/model/event/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent) => {
    const r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.event.create({
        data: { name: event.name, path: event.path },
      });
      return saveEvent;
    });
    return r.path;
  };
}
