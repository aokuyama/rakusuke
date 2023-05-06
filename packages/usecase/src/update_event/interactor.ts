import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  UpdateEventInput,
  UpdateEventPresenter,
  UpdateEventUsecase,
} from ".";
import { EventRepository } from "domain/src/model/event/repository";
import { UpdateEvent } from "domain/src/model/event";
import { UserID } from "domain/src/model/user";

@injectable()
export class UpdateEventInteractor implements UpdateEventUsecase {
  constructor(
    @inject("UpdateEventPresenter")
    private readonly presenter: UpdateEventPresenter,
    @inject("EventRepository")
    private readonly repository: EventRepository
  ) {}

  handle = async (input: UpdateEventInput) => {
    const after = UpdateEvent.new({
      path: input.path,
      name: input.name,
      dates: input.dates,
    });
    const existingEvent = await this.repository.loadEventByPath(after._path);
    if (!existingEvent) {
      throw new Error("event not found");
    }
    if (!existingEvent.isOrganizer(new UserID(input.userId))) {
      // 主催者でなければ編集できない
      return;
    }
    const updatedEvent = await this.repository.updateEvent(
      existingEvent,
      after
    );
    await this.presenter.render({ event: updatedEvent.toFront() });
  };
}
