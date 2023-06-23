import { DomainEvent } from "domain/src/domain_event/event";
import { EventGuest } from "./event_guest";

export class CreateGuestEvent extends DomainEvent {
  constructor(guest: EventGuest) {
    super(guest.serialize());
  }
}

export class UpdateGuestEvent extends DomainEvent {
  constructor(guest: EventGuest) {
    super(guest.serialize());
  }
}
