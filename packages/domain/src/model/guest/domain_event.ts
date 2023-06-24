import { DomainEvent } from "domain/src/domain_event/event";
import { EventGuest } from "./event_guest";

export class CreateGuestEvent extends DomainEvent {
  get name(): string {
    return "CreateGuestEvent";
  }
  constructor(guest: EventGuest) {
    super(guest.serialize());
  }
}

export class UpdateGuestEvent extends DomainEvent {
  get name(): string {
    return "UpdateGuestEvent";
  }
  constructor(guest: EventGuest) {
    super(guest.serialize());
  }
}
