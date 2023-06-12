import { Date } from "domain/src/model/date";

export type EventDate = {
  id: string;
  date: Date;
  selected: boolean;
  attendees: {
    name: string;
  }[];
};
