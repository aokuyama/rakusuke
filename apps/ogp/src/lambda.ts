import * as dotenv from "dotenv";
import { getEventByPath } from "./controller/get_event_by_path";

export const handler = async (event: any) => {
  dotenv.config({ override: true });
  return await getEventByPath(event);
};
