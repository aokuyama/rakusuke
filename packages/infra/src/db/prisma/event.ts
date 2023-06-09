import { ExistingEvent, NewEvent, UpdateEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { client } from "./client";
import { EventPath } from "domain/src/model/event/path";
import { Date } from "domain/src/model/event/date";
import { emptyToNull, nullToUndefined } from ".";

export class PrismaEventRepository implements EventRepository {
  createEvent = async (event: NewEvent): Promise<ExistingEvent> => {
    const savedEvent = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.event.create({
        data: {
          uuid: event.uuid,
          organizer_id: event.organizerId,
          name: event.name,
          description: emptyToNull(event.description),
          path_digest: event.hashedPath(),
          schedules: {
            create: event._dates.globalThisDates().map((d) => {
              return { datetime: d };
            }),
          },
        },
      });
      return saveEvent;
    });
    const schedules = event._dates.globalThisDates().map((d) => {
      return { date: Date.formatString(d) };
    });
    return event.toExisting(
      savedEvent.id,
      schedules,
      Date.convert(savedEvent.created_at)
    );
  };

  loadEventByPath = async (path: EventPath): Promise<ExistingEvent | null> => {
    const event = await client.event.findUnique({
      where: {
        path_digest: path.hashed(),
      },
      include: {
        schedules: { select: { datetime: true, held: true } },
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
      return { date: Date.formatString(s.datetime), held: s.held };
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
      uuid: event.uuid,
      id: event.id,
      organizerId: event.organizer_id,
      name: event.name,
      description: nullToUndefined(event.description),
      path: path,
      schedules: schedules,
      guests: guests,
      created: Date.formatString(event.created_at),
    });
  };

  updateEvent = async (
    before: ExistingEvent,
    after: UpdateEvent
  ): Promise<ExistingEvent> => {
    const { updatedEvent, addedDates, removedDates, updatedSchedules } =
      after.makeUpdateSchedules(before);
    const updatedScheduleSchema = updatedSchedules.map((s) => {
      return {
        where: {
          event_id_datetime: {
            event_id: before.id,
            datetime: s._date.getGlobalThisDate(),
          },
        },
        data: { held: s.held },
      };
    });

    await client.$transaction(async (prisma) => {
      console.info(updatedEvent.description);
      await prisma.event.update({
        where: { id: before.id },
        data: {
          name: updatedEvent.name,
          description: emptyToNull(updatedEvent.description),
          schedules: {
            create: addedDates.map((d) => {
              return { datetime: d.getGlobalThisDate() };
            }),
            update: updatedScheduleSchema,
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
