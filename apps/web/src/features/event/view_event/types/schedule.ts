import { Date } from "domain/src/model/date";

export type Schedule = {
  id: string;
  date: Date;
  length: number;
  strong: boolean;
  selected: boolean;
};
