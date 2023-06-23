import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  DecideOnEventDateInput,
  DecideOnEventDatePresenter,
  DecideOnEventDateUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { Date } from "domain/src/model/date";
import { UserID } from "domain/src/model/user";
import { UpdateEventHeld, EventPath } from "domain/src/model/event";
import { DomainEventPublisher } from "domain/src/domain_event/publisher";
import { UpdateEventDateEvent } from "domain/src/model/event/domain_event";

@injectable()
export class DecideOnEventDateInteractor implements DecideOnEventDateUsecase {
  constructor(
    @inject("DomainEventPublisher")
    private readonly eventPublisher: DomainEventPublisher,
    @inject("DecideOnEventDatePresenter")
    private readonly presenter: DecideOnEventDatePresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: DecideOnEventDateInput) => {
    const path = new EventPath(input.path);
    const existingEvent = await this.repository.loadEventByPath(path);
    if (!existingEvent) {
      throw new Error("event not found");
    }
    if (!existingEvent.isOrganizer(new UserID(input.userId))) {
      // 主催者でなければ編集できない
      return;
    }
    const after = UpdateEventHeld.new({
      held: new Date(input.date),
    });
    const updatedEvent = await this.repository.updateEvent(
      existingEvent,
      after
    );
    this.eventPublisher.publish(new UpdateEventDateEvent(updatedEvent));
    await this.presenter.render({ event: updatedEvent });
  };
}
