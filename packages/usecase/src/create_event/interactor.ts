import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  CreateEventInput,
  CreateEventPresenter,
  CreateEventUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { NewEvent } from "domain/src/model/event";
import { UserID } from "domain/src/model/user";

@injectable()
export class CreateEventInteractor implements CreateEventUsecase {
  constructor(
    @inject("CreateEventPresenter")
    private readonly presenter: CreateEventPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: CreateEventInput) => {
    const organizerId = new UserID(input.organizerId);
    // TODO 天文学的な確率で失敗した時のリトライを入れる
    const event = NewEvent.create({
      organizerId: organizerId,
      name: input.name,
      dates: input.dates,
    });
    const path = await this.repository.createEvent(event);
    await this.presenter.render({ path: path });
  };
}
