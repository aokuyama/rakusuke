import { DomainEvent } from "domain/src/domain_event/event";
import { DomainEventSubscriber } from "domain/src/domain_event/subscriber";

export class DomainEventLogger implements DomainEventSubscriber {
  isSubscribe = () => true;
  subscribe = async (event: DomainEvent): Promise<void> => {
    console.info(event.name);
    console.info(event.body());
  };
}
