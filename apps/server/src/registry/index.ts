import { container as containerBase } from "infra/src/registry";
import { registerEvent } from "./create_event";

export const container = containerBase;

registerEvent(container);
