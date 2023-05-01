import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  RespondAttendanceInput,
  RespondAttendancePresenter,
  RespondAttendanceUsecase,
} from ".";
import { AttendeeRepository } from "domain/src/model/attendee";
import { Attendee } from "domain/src/model/event/attendee";

@injectable()
export class RespondAttendanceInteractor implements RespondAttendanceUsecase {
  constructor(
    @inject("RespondAttendancePresenter")
    private readonly presenter: RespondAttendancePresenter,
    @inject("AttendeeRepository")
    private readonly repository: AttendeeRepository
  ) {}

  handle = async (input: RespondAttendanceInput) => {
    const attendance = Attendee.create({
      eventPath: input.eventPath,
      name: input.name,
      attendance: input.attendance,
    });
    const id = await this.repository.create(attendance);
    await this.presenter.render({ id: id.value });
  };
}
