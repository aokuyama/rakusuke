import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  CreateEventInput,
  CreateEventPresenter,
  CreateEventUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { NewEvent } from "domain/src/model/event";

@injectable()
export class CreateEventInteractor implements CreateEventUsecase {
  constructor(
    @inject("CreateEventPresenter")
    private readonly presenter: CreateEventPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: CreateEventInput) => {
    // TODO 天文学的な確率で失敗した時のリトライを入れる
    const event = new NewEvent(input.name, input.dates);
    const path = await this.repository.createEvent(event);
    await this.presenter.render({ path: path });
  };
}
