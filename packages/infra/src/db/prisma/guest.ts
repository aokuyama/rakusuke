import {
  NewGuest,
  GuestNumber,
  GuestRepository,
  EventGuest,
} from "domain/src/model/guest";
import { client } from "./client";
import { Date } from "domain/src/model/event/date";
import { EventPath } from "domain/src/model/event/path";

export class PrismaGuestRepository implements GuestRepository {
  create = async (
    eventPath: EventPath,
    guest: NewGuest
  ): Promise<EventGuest> => {
    const r = await client.$transaction(async (prisma) => {
      const event = await prisma.event.findUnique({
        where: { path: eventPath.value },
        include: { guests: { select: { guest_number: true } }, schedules: {} },
      });
      if (!event) {
        throw new Error("event not found");
      }
      const guestNumber = GuestNumber.generate(
        event.guests.map((g) => g.guest_number)
      );
      const attendance: Attendance[] = [];
      for (const schedule of event.schedules) {
        const date = Date.convert(schedule.datetime);
        if (!guest.isAnswering(date)) {
          continue;
        }
        attendance.push({ id: schedule.id, enabled: guest.isAttend(date) });
      }
      const newGuest = await prisma.guest.create({
        data: {
          event_id: event.id,
          name: guest.name,
          guest_number: guestNumber.value,
        },
      });
      await prisma.attendance.createMany({
        data: attendance.map((a) => {
          return {
            guest_id: newGuest.id,
            schedule_id: a.id,
            enabled: a.enabled,
          };
        }),
      });
      return new EventGuest({
        number: new GuestNumber(newGuest.id),
        name: guest._name,
        attendance: guest._attendance,
      });
    });
    return r;
  };
  update = async (
    eventPath: EventPath,
    guest: EventGuest
  ): Promise<EventGuest> => {
    console.error("Unimplemented");
    console.error(guest.serialize());
    return guest;
  };
}

type Attendance = { id: number; enabled: boolean };
