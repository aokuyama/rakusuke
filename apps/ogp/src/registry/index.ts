import { container as containerBase } from "infra/src/registry";
import { registerEvent } from "./event";

export const container = containerBase;

registerEvent(container);
