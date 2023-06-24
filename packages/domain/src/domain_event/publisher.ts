import { DomainEventSubscriber } from "./subscriber";
import { DomainEvent } from "./event";

export class DomainEventPublisher {
  private readonly subscribers: readonly DomainEventSubscriber[];
  constructor(subscribers: DomainEventSubscriber[]) {
    this.subscribers = Object.freeze(subscribers);
  }

  register(
    subscriber: DomainEventSubscriber | DomainEventSubscriber[]
  ): DomainEventPublisher {
    const subs = Array.isArray(subscriber) ? subscriber : [subscriber];
    return new DomainEventPublisher(subs);
  }

  async publish(event: DomainEvent): Promise<void> {
    await Promise.all(
      this.subscribers.map(async (subscriber) => {
        if (subscriber.isSubscribe(event)) {
          return await subscriber.subscribe(event);
        }
      })
    );
  }
}
