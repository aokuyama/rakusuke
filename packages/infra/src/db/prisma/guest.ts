import { Guest, GuestNumber, GuestRepository } from "domain/src/model/guest";
import { client } from "./client";
import { Date } from "domain/src/model/event/date";

export class PrismaGuestRepository implements GuestRepository {
  create = async (guest: Guest): Promise<GuestNumber> => {
    const r = await client.$transaction(async (prisma) => {
      const event = await prisma.event.findUnique({
        where: { path: guest.eventPath },
        include: { guests: { select: { guest_number: true } }, schedules: {} },
      });
      if (!event) {
        throw new Error("event not found");
      }
      const guestNumber = GuestNumber.generate(
        event.guests.map((g) => g.guest_number)
      );
      const schedules: Attendance[] = [];
      for (const schedule of event.schedules) {
        const date = new Date(schedule.datetime);
        if (!guest.isAnswering(date)) {
          continue;
        }
        schedules.push({ id: schedule.id, enabled: guest.isAttend(date) });
      }
      const newGuest = await prisma.guest.create({
        data: {
          event_id: event.id,
          name: guest.name,
          guest_number: guestNumber.value,
        },
      });
      await prisma.attendance.createMany({
        data: schedules.map((s) => {
          return {
            guest_id: newGuest.id,
            schedule_id: s.id,
            enabled: s.enabled,
          };
        }),
      });
      return newGuest.id;
    });
    return new GuestNumber(r);
  };
}

type Attendance = { id: number; enabled: boolean };
