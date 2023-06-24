import { DomainEvent } from "domain/src/domain_event/event";
import { UserEntity } from "./user";

export class CreateUserEvent extends DomainEvent {
  get name(): string {
    return "CreateUserEvent";
  }
  constructor(user: UserEntity) {
    super(user.serialize());
  }
}
