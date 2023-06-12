import { CurrentEvent, CurrentEventArgs } from "./event";
import { ArrayValueObject } from "../valueobject";
import { EventPath } from "./path";

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
  pushEvents = (events: RecentlyViewedEvent): RecentlyViewedEvent => {
    let newEvents = undefined;
    for (const e of events._value) {
      if (!newEvents) {
        newEvents = this.push(e);
      } else {
        newEvents = newEvents.push(e);
      }
    }
    if (newEvents) {
      return newEvents;
    }
    return this;
  };
  order = (currentEvent: CurrentEvent | null): RecentlyViewedEvent => {
    let events = [];
    if (currentEvent) {
      for (const e of this._value) {
        if (!currentEvent.sameIdAs(e)) {
          events.push(e);
        }
      }
    } else {
      events = this._value.map((e) => e);
    }
    return new RecentlyViewedEvent(events.reverse());
  };
  get = (path: EventPath): CurrentEvent | undefined => {
    for (const e of this._value) {
      if (e.equalsPath(path)) {
        return e;
      }
    }
  };
}
