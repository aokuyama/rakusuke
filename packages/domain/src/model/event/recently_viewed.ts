import { CurrentEvent, CurrentEventArgs } from "./event";
import { ArrayValueObject } from "../valueobject";

export class RecentlyViewedEvent extends ArrayValueObject<
  CurrentEvent,
  string
> {
  static readonly MAX: number = 5;
  protected validate(value: CurrentEvent[]): void {
    if (new Set(value.map((a) => a.uuid)).size != value.length) {
      throw new Error("duplicate uuid");
    }
    if (value.length > RecentlyViewedEvent.MAX) {
      throw new Error("up to " + RecentlyViewedEvent.MAX + " recent events");
    }
  }
  static new(value: CurrentEventArgs[]): RecentlyViewedEvent {
    return new RecentlyViewedEvent(value.map((e) => CurrentEvent.new(e)));
  }
  static createEmpty(): RecentlyViewedEvent {
    return new RecentlyViewedEvent([]);
  }
  push = (event: CurrentEvent): RecentlyViewedEvent => {
    const events = [];
    for (const e of this._value) {
      if (!event.sameIdAs(e)) {
        events.push(e);
      }
    }
    if (events.length == RecentlyViewedEvent.MAX) {
      events.shift();
    }
    events.push(event);
    return new RecentlyViewedEvent(events);
  };
}
