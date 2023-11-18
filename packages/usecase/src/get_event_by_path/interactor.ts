import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  GetEventByPathInput,
  GetEventByPathPresenter,
  GetEventByPathUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { EventPath } from "domain/src/model/event/path";

@injectable()
export class GetEventByPathInteractor implements GetEventByPathUsecase {
  constructor(
    @inject("GetEventByPathPresenter")
    private readonly presenter: GetEventByPathPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository,
  ) {}

  handle = async (input: GetEventByPathInput) => {
    const path = EventPath.newSafe(input.path);
    if (path) {
      const event = await this.repository.loadEventByPath(path);
      await this.presenter.render({ event: event });
    } else {
      await this.presenter.render({ event: null });
    }
  };
}
