import { Event, NewEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent) => {
    const r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.event.create({
        data: {
          name: event.name,
          path: event.path,
          schedules: {
            create: event._dates._value.map((d) => {
              return { datetime: d.getGlobalThisDate() };
            }),
          },
        },
      });
      return saveEvent;
    });
    return r.path;
  };
  getEventByPath = async (path: string): Promise<Event | null> => {
    throw new Error("unimplemented");
  };
}
