import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  RespondAttendanceInput,
  RespondAttendancePresenter,
  RespondAttendanceUsecase,
} from ".";
import { NewGuest, GuestRepository } from "domain/src/model/guest";
import { EventPath } from "domain/src/model/event/path";

@injectable()
export class RespondAttendanceInteractor implements RespondAttendanceUsecase {
  constructor(
    @inject("RespondAttendancePresenter")
    private readonly presenter: RespondAttendancePresenter,
    @inject("GuestRepository")
    private readonly repository: GuestRepository
  ) {}

  handle = async (input: RespondAttendanceInput) => {
    const guest = NewGuest.new({
      name: input.name,
      attendance: input.attendance,
    });
    const eventPath = new EventPath(input.eventPath);
    const id = await this.repository.create(eventPath, guest);
    await this.presenter.render({ id: id.value });
  };
}
