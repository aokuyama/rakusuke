import { DomainEvent } from "./event";

export interface Subscriber {
  isSubscribe(event: DomainEvent): boolean;
  subscribe(event: DomainEvent): Promise<void>;
}
