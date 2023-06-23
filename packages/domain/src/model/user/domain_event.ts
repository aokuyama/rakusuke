import { DomainEvent } from "domain/src/domain_event/event";
import { UserEntity } from "./user";

export class CreateUserEvent extends DomainEvent {
  constructor(user: UserEntity) {
    super(user.serialize());
  }
}
