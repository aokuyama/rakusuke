import { ExistingEvent, NewEvent, UpdateEvent } from "domain/src/model/event";
import { EventRepository } from "domain/src/model/event/repository";
import { EventPath } from "domain/src/model/event/path";
import { getClient } from "./client";
import { Date } from "domain/src/model/date";

export class PostgresEventRepository implements EventRepository {
  loadEventByPath = async (path: EventPath): Promise<ExistingEvent | null> => {
    const digest = path.hashed();
    const client = getClient();
    const events = await client`
    SELECT
    "uuid","id","organizer_id","name","description","created_at"
    FROM "event"
    WHERE "path_digest" = ${digest};
  `;
    if (events.length != 1) {
      return null;
    }
    const event = events[0];
    const created = Date.formatString(event.created_at);
    const result = ExistingEvent.new({
      uuid: event.uuid,
      id: event.id,
      organizerId: event.organizer_id,
      name: event.name,
      description: event.description,
      path: path,
      schedules: [{ date: created, held: false }], // dummy
      guests: [], // dummy
      created: created,
    });
    return result;
  };
  createEvent!: (event: NewEvent) => Promise<ExistingEvent>;
  updateEvent!: (
    before: ExistingEvent,
    after: UpdateEvent
  ) => Promise<ExistingEvent>;
}
