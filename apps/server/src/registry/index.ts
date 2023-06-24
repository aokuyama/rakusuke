import { container as containerBase } from "infra/src/registry";
import { registerEvent } from "./create_event";
import { DomainEventPublisher } from "domain/src/domain_event/publisher";
//import { DomainEventLogger } from "infra/src/event/logger";
import { AwsSnsTransfer } from "infra/src/event/aws";

export const container = containerBase;

const subscribers = [];
//subscribers.push(new DomainEventLogger());
if (process.env.AWS_SNS_DOMAIN_EVENT_TOPIC) {
  subscribers.push(new AwsSnsTransfer());
}

const eventPublisher = new DomainEventPublisher(subscribers);
container.register("DomainEventPublisher", {
  useValue: eventPublisher,
});

registerEvent(container);
