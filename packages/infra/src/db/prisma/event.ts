import { UpcomingEvent, NewEvent, UpdateEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";
import { EventPath } from "domain/src/model/event/path";
import { Date } from "domain/src/model/event/date";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent): Promise<string> => {
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
        schedules: { select: { datetime: true } },
        guests: {
          include: {
            attendance: {
              include: {
                schedule: {
                  select: { datetime: true },
                },
              },
            },
          },
        },
      },
    });
    if (!event) {
      return null;
    }
    const schedules = event.schedules.map((s) => {
      return { date: Date.formatString(s.datetime) };
    });
    const guests = event.guests.map((g) => {
      const name = g.name;
      const number = g.guest_number;
      const attendance = g.attendance.map((a) => {
        return {
          attend: a.enabled,
          date: Date.formatString(a.schedule.datetime),
        };
      });
      return {
        name: name,
        number: number,
        attendance: attendance,
      };
    });
    return UpcomingEvent.new({
      name: event.name,
      path: event.path,
      schedules: schedules,
      guests: guests,
    });
  };

  updateEvent = async (event: UpdateEvent): Promise<UpcomingEvent> => {
    const currentEvent = await this.loadEventByPath(event._path);
    if (!currentEvent) {
      throw new Error("event not found");
    }
    console.error("unimplemented");
    console.error(event.serialize());
    return currentEvent;
  };
}
