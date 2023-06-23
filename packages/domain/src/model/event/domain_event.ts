import { DomainEvent } from "domain/src/domain_event/event";
import { ExistingEvent } from "./existing_event";

export class CreateEventEvent extends DomainEvent {
  constructor(event: ExistingEvent) {
    super(event.serialize());
  }
}

export class UpdateEventEvent extends DomainEvent {
  constructor(event: ExistingEvent) {
    super(event.serialize());
  }
}

export class UpdateEventDateEvent extends DomainEvent {
  constructor(event: ExistingEvent) {
    super(event.serialize());
  }
}
