import { UpcomingEvent, NewEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";
import { EventPath } from "domain/src/model/event/path";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent) => {
    const r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.event.create({
        data: {
          name: event.name,
          path: event.path,
          schedules: {
            create: event._dates.globalThisDates().map((d) => {
              return { datetime: d };
            }),
          },
        },
      });
      return saveEvent;
    });
    return r.path;
  };
  loadEventByPath = async (path: EventPath): Promise<UpcomingEvent | null> => {
    const event = await client.event.findUnique({
      where: {
        path: path.value,
      },
      include: {
        schedules: {},
      },
    });
    if (!event) {
      return null;
    }
    const schedules = event.schedules.map((s) => {
      return { date: s.datetime };
    });
    return UpcomingEvent.new({
      name: event.name,
      path: event.path,
      schedules: schedules,
    });
  };
}
