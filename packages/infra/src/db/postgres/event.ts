import { ExistingEvent, NewEvent, UpdateEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { EventPath } from "domain/src/model/event/path";
import { getClient } from "./client";
import { Date } from "domain/src/model/event/date";

export class PostgresEventRepository implements EventRepository {
  loadEventByPath = async (path: EventPath): Promise<ExistingEvent | null> => {
    const digest = path.hashed();
    const client = getClient();
    const events = await client`
    SELECT
      "id","organizer_id","name","created_at"
    FROM "event"
    WHERE "path_digest" = ${digest};
  `;
    if (events.length != 1) {
      return null;
    }
    const event = events[0];
    const created = Date.formatString(event.created_at);
    const result = ExistingEvent.new({
      id: event.id,
      organizerId: event.organizer_id,
      name: event.name,
      path: path,
      schedules: [{ date: created }], // dummy
      guests: [], // dummy
      created: created,
    });
    return result;
  };
  createEvent!: (event: NewEvent) => Promise<EventPath>;
  updateEvent!: (
    before: ExistingEvent,
    after: UpdateEvent
  ) => Promise<ExistingEvent>;
}
