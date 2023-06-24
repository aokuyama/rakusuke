import { DomainEvent } from "domain/src/domain_event/event";
import { DomainEventSubscriber } from "domain/src/domain_event/subscriber";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: process.env.AWS_SNS_DOMAIN_EVENT_REGION || "us-east-1",
});

export class AwsSnsTransfer implements DomainEventSubscriber {
  isSubscribe = () => true;
  subscribe = async (event: DomainEvent): Promise<void> => {
    const params = {
      Message: event.body(),
      TopicArn: process.env.AWS_SNS_DOMAIN_EVENT_TOPIC,
      Subject: event.name,
      MessageGroupId: event.name,
      MessageAttributes: {
        eventName: { DataType: "String", StringValue: event.name },
      },
    };
    try {
      const data = await snsClient.send(new PublishCommand(params));
      console.debug(data);
    } catch (err) {
      console.error(err);
    }
  };
}
