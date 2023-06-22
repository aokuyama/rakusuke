import { container as containerBase } from "infra/src/registry";
import { registerEvent } from "./create_event";
import { DomainEventPublisher } from "domain/src/domain_event/publisher";

export const container = containerBase;

const eventPublisher = new DomainEventPublisher([]);
container.register("DomainEventPublisher", {
  useValue: eventPublisher,
});

registerEvent(container);
