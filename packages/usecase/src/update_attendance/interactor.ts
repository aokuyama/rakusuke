import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  UpdateAttendanceInput,
  UpdateAttendancePresenter,
  UpdateAttendanceUsecase,
} from ".";
import { GuestRepository, EventGuest } from "domain/src/model/guest";
import { EventPath } from "domain/src/model/event/path";

@injectable()
export class UpdateAttendanceInteractor implements UpdateAttendanceUsecase {
  constructor(
    @inject("UpdateAttendancePresenter")
    private readonly presenter: UpdateAttendancePresenter,
    @inject("GuestRepository")
    private readonly repository: GuestRepository
  ) {}

  handle = async (input: UpdateAttendanceInput) => {
    const guest = EventGuest.new({
      number: input.number,
      name: input.name,
      attendance: input.attendance,
    });
    const eventPath = new EventPath(input.eventPath);
    const updatedGuest = await this.repository.update(eventPath, guest);
    await this.presenter.render(updatedGuest.serialize());
  };
}
