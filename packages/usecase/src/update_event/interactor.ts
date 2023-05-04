import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  UpdateEventInput,
  UpdateEventPresenter,
  UpdateEventUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { UpdateEvent } from "domain/src/model/event";

@injectable()
export class UpdateEventInteractor implements UpdateEventUsecase {
  constructor(
    @inject("UpdateEventPresenter")
    private readonly presenter: UpdateEventPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: UpdateEventInput) => {
    const event = UpdateEvent.new({
      path: input.path,
      name: input.name,
      dates: input.dates,
    });
    const updatedEvent = await this.repository.updateEvent(event);
    await this.presenter.render({ event: updatedEvent });
  };
}
