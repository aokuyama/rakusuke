import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  CreateEventInput,
  CreateEventPresenter,
  CreateEventUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { createEventPath } from "domain/src/model/event/path";
import { NewEvent } from "domain/src/model/event/event";

@injectable()
export class CreateEventInteractor implements CreateEventUsecase {
  constructor(
    @inject("CreateEventPresenter")
    private readonly presenter: CreateEventPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: CreateEventInput) => {
    const reservedPath = createEventPath();
    const event = new NewEvent(reservedPath, input.name, input.dates);
    const path = await this.repository.createEvent(event);
    await this.presenter.render({ path: path });
  };
}
