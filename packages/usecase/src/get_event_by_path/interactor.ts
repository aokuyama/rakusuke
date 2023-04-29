import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  GetEventByPathInput,
  GetEventByPathPresenter,
  GetEventByPathUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";

@injectable()
export class GetEventByPathInteractor implements GetEventByPathUsecase {
  constructor(
    @inject("GetEventByPathPresenter")
    private readonly presenter: GetEventByPathPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: GetEventByPathInput) => {
    const event = await this.repository.loadEventByPath(input.path);
    await this.presenter.render({ event: event });
  };
}
