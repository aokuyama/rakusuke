import { ExistingEvent, NewEvent, UpdateEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";
import { EventPath } from "domain/src/model/event/path";
import { Date } from "domain/src/model/event/date";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent): Promise<EventPath> => {
    const _r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.event.create({
        data: {
          uuid: event.uuid,
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
    return event.getExistingPath();
  };

  loadEventByPath = async (path: EventPath): Promise<ExistingEvent | null> => {
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
    return ExistingEvent.new({
      id: event.id,
      organizerId: event.organizer_id,
      name: event.name,
      path: path.rawValue(),
      schedules: schedules,
      guests: guests,
    });
  };

  updateEvent = async (
    before: ExistingEvent,
    after: UpdateEvent
  ): Promise<ExistingEvent> => {
    const { updatedEvent, addedDates, removedDates } =
      before.updateEvent(after);

    await client.$transaction(async (prisma) => {
      await prisma.event.update({
        where: { id: before.id },
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
          event_id: before.id,
          datetime: { in: removedDates.map((d) => d.getGlobalThisDate()) },
        },
      });
    });
    return updatedEvent;
  };
}
