import {
  NewGuest,
  GuestNumber,
  GuestRepository,
  EventGuest,
} from "domain/src/model/guest";
import { client } from "./client";
import { Date } from "domain/src/model/event/date";
import { EventPath } from "domain/src/model/event/path";
import { attendance, schedule } from "@prisma/client";

export class PrismaGuestRepository implements GuestRepository {
  create = async (
    eventPath: EventPath,
    guest: NewGuest
  ): Promise<EventGuest> => {
    const r = await client.$transaction(async (prisma) => {
      const event = await prisma.event.findUnique({
        where: { path_digest: eventPath.hashed() },
        include: { guests: { select: { guest_number: true } }, schedules: {} },
      });
      if (!event) {
        throw new Error("event not found");
      }
      const guestNumber = GuestNumber.generate(
        event.guests.map((g) => g.guest_number)
      );
      const attendance = pickAnswered(guest, event.schedules);
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
            schedule_id: a.scheduleId,
            enabled: a.enabled,
          };
        }),
      });
      return new EventGuest({
        number: new GuestNumber(newGuest.guest_number),
        name: guest._name,
        attendance: guest.getCurrentAttendanceList(),
      });
    });
    return r;
  };
  update = async (
    eventPath: EventPath,
    guest: EventGuest
  ): Promise<EventGuest> => {
    const r = await client.$transaction(async (prisma) => {
      const currentGuest = await prisma.guest.findFirstOrThrow({
        where: {
          guest_number: guest.number,
          event: {
            path_digest: eventPath.hashed(),
          },
        },
        include: {
          event: { include: { schedules: {} } },
          attendance: {},
        },
      });
      const attendance = pickAnswered(guest, currentGuest.event.schedules);

      const creates = [];
      const updates = [];
      for (const a of attendance) {
        const isUpdated = isUpdatedAnswer(a, currentGuest.attendance);
        if (isUpdated === null) {
          creates.push(a);
        } else if (isUpdated) {
          updates.push(a);
        }
      }
      if (creates.length) {
        await prisma.attendance.createMany({
          data: creates.map((a) => {
            return {
              guest_id: currentGuest.id,
              schedule_id: a.scheduleId,
              enabled: a.enabled,
            };
          }),
        });
      }
      if (updates) {
        for (const a of updates) {
          await prisma.attendance.update({
            data: {
              enabled: a.enabled,
            },
            where: {
              guest_id_schedule_id: {
                guest_id: currentGuest.id,
                schedule_id: a.scheduleId,
              },
            },
          });
        }
      }
      if (guest.name !== currentGuest.name) {
        await prisma.guest.update({
          data: {
            name: guest.name,
          },
          where: {
            id: currentGuest.id,
          },
        });
      }
    });
    return guest;
  };
}

type Attendance = { scheduleId: number; enabled: boolean };

const pickAnswered = (guest: NewGuest | EventGuest, schedules: schedule[]) => {
  const attendance: Attendance[] = [];
  for (const schedule of schedules) {
    const date = Date.convert(schedule.datetime);
    if (!guest.isAnswering(date)) {
      continue;
    }
    attendance.push({
      scheduleId: schedule.id,
      enabled: guest.isAttend(date),
    });
  }
  return attendance;
};

const isUpdatedAnswer = (
  newAnswer: Attendance,
  currentAnswers: attendance[]
): boolean | null => {
  for (const currentAnswer of currentAnswers) {
    if (newAnswer.scheduleId == currentAnswer.schedule_id) {
      return newAnswer.enabled !== currentAnswer.enabled;
    }
  }
  return null;
};
