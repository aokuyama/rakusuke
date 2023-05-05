import { UpcomingEvent, NewEvent, UpdateEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";
import { EventPath } from "domain/src/model/event/path";
import { Date } from "domain/src/model/event/date";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent): Promise<string> => {
    const _r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.event.create({
        data: {
          organizer_id: event.organizerId,
          name: event.name,
          path: event.hashedPath(),
          schedules: {
            create: event._dates.globalThisDates().map((d) => {
              return { datetime: d };
            }),
          },
        },
      });
      return saveEvent;
    });
    return event.path; // raw value
  };

  protected loadEventAndIdByPath = async (
    path: EventPath
  ): Promise<{ id: number; event: UpcomingEvent } | null> => {
    const event = await client.event.findUnique({
      where: {
        path: path.hashed(),
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
    return {
      id: event.id,
      event: UpcomingEvent.new({
        name: event.name,
        path: path.value, // raw value
        schedules: schedules,
        guests: guests,
      }),
    };
  };

  loadEventByPath = async (path: EventPath): Promise<UpcomingEvent | null> => {
    const r = await this.loadEventAndIdByPath(path);
    return r ? r.event : null;
  };

  updateEvent = async (event: UpdateEvent): Promise<UpcomingEvent> => {
    const current = await this.loadEventAndIdByPath(event._path);
    if (!current) {
      throw new Error("event not found");
    }
    const { updatedEvent, addedDates, removedDates } =
      current.event.update(event);

    await client.$transaction(async (prisma) => {
      await prisma.event.update({
        where: { id: current.id },
        data: {
          name: updatedEvent.name,
          schedules: {
            create: addedDates.map((d) => {
              return { datetime: d.getGlobalThisDate() };
            }),
          },
        },
      });
      await prisma.schedule.deleteMany({
        where: {
          event_id: current.id,
          datetime: { in: removedDates.map((d) => d.getGlobalThisDate()) },
        },
      });
    });
    return updatedEvent;
  };
}
