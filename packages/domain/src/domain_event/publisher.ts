import { Subscriber } from "./subscriber";
import { DomainEvent } from "./event";

export class DomainEventPublisher {
  private readonly subscribers: readonly Subscriber[];
  constructor(subscribers: Subscriber[]) {
    this.subscribers = Object.freeze(subscribers);
  }

  register(subscriber: Subscriber | Subscriber[]): DomainEventPublisher {
    const subs = Array.isArray(subscriber) ? subscriber : [subscriber];
    return new DomainEventPublisher(subs);
  }

  async publish(event: DomainEvent): Promise<void> {
    await Promise.all(
      this.subscribers.map(async (subscriber) => {
        if (subscriber.isSubscribe(event)) {
          return subscriber.subscribe(event);
        }
      })
    );
  }
}
