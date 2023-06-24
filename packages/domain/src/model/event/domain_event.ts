import { DomainEvent } from "domain/src/domain_event/event";
import { ExistingEvent } from "./existing_event";

export class CreateEventEvent extends DomainEvent {
  get name(): string {
    return "CreateEventEvent";
  }
  constructor(event: ExistingEvent) {
    super(event.serialize());
  }
}

export class UpdateEventEvent extends DomainEvent {
  get name(): string {
    return "UpdateEventEvent";
  }
  constructor(event: ExistingEvent) {
    super(event.serialize());
  }
}

export class UpdateEventDateEvent extends DomainEvent {
  get name(): string {
    return "UpdateEventDateEvent";
  }
  constructor(event: ExistingEvent) {
    super(event.serialize());
  }
}
