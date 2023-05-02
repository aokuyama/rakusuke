import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  RespondAttendanceInput,
  RespondAttendancePresenter,
  RespondAttendanceUsecase,
} from ".";
import { Guest, GuestRepository } from "domain/src/model/guest";

@injectable()
export class RespondAttendanceInteractor implements RespondAttendanceUsecase {
  constructor(
    @inject("RespondAttendancePresenter")
    private readonly presenter: RespondAttendancePresenter,
    @inject("GuestRepository")
    private readonly repository: GuestRepository
  ) {}

  handle = async (input: RespondAttendanceInput) => {
    const attendance = Guest.create({
      eventPath: input.eventPath,
      name: input.name,
      attendance: input.attendance,
    });
    const id = await this.repository.create(attendance);
    await this.presenter.render({ id: id.value });
  };
}
