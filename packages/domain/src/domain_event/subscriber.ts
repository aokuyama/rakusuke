import { DomainEvent } from "./event";

export interface DomainEventSubscriber {
  isSubscribe(event: DomainEvent): boolean;
  subscribe(event: DomainEvent): Promise<void>;
}
