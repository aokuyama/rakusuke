import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  ResetEventDateInput,
  ResetEventDatePresenter,
  ResetEventDateUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { UserID } from "domain/src/model/user";
import { UpdateEventNoHeld, EventPath } from "domain/src/model/event";
import { DomainEventPublisher } from "domain/src/domain_event/publisher";
import { UpdateEventDateEvent } from "domain/src/model/event/domain_event";

@injectable()
export class ResetEventDateInteractor implements ResetEventDateUsecase {
  constructor(
    @inject("DomainEventPublisher")
    private readonly eventPublisher: DomainEventPublisher,
    @inject("ResetEventDatePresenter")
    private readonly presenter: ResetEventDatePresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: ResetEventDateInput) => {
    const path = new EventPath(input.path);
    const existingEvent = await this.repository.loadEventByPath(path);
    if (!existingEvent) {
      throw new Error("event not found");
    }
    if (!existingEvent.isOrganizer(new UserID(input.userId))) {
      // 主催者でなければ編集できない
      return;
    }
    const after = UpdateEventNoHeld.new();
    const updatedEvent = await this.repository.updateEvent(
      existingEvent,
      after
    );
    await this.eventPublisher.publish(new UpdateEventDateEvent(updatedEvent));
    await this.presenter.render({ event: updatedEvent });
  };
}
