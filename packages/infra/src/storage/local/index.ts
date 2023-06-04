import { unregisteredUser, User, RegisteredUser } from "domain/src/model/user";
import { RecentlyViewedEvent } from "domain/src/model/event/recently_viewed";

export class LocalStorage {
  getUser = (): User => {
    if (typeof window === "undefined") {
      return unregisteredUser;
    }

    const user = window.localStorage.getItem("user");
    return user ? RegisteredUser.new(JSON.parse(user)) : unregisteredUser;
  };
  saveUser = (user: RegisteredUser) => {
    window.localStorage.setItem("user", JSON.stringify(user.getAuthInfo()));
  };
  getRecentEvents = (): RecentlyViewedEvent | undefined => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const events = window.localStorage.getItem("recent_events");
    return events
      ? RecentlyViewedEvent.new(JSON.parse(events))
      : RecentlyViewedEvent.createEmpty();
  };
  saveRecentEvents = (events: RecentlyViewedEvent) => {
    window.localStorage.setItem("recent_events", JSON.stringify(events.value));
  };
}
