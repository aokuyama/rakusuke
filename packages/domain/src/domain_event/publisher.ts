import { Subscriber } from "./subscriber";
import { DomainEvent } from "./event";

export class Publisher {
  private readonly subscribers: readonly Subscriber[];
  constructor(subscribers: Subscriber[]) {
    this.subscribers = Object.freeze(subscribers);
  }

  register(subscriber: Subscriber | Subscriber[]): Publisher {
    const subs = Array.isArray(subscriber) ? subscriber : [subscriber];
    return new Publisher(subs);
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
