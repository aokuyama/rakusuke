import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import type {
  RespondAttendanceInput,
  RespondAttendancePresenter,
  RespondAttendanceUsecase,
} from ".";
import { NewGuest, GuestRepository } from "domain/src/model/guest";
import { EventPath } from "domain/src/model/event/path";
import { EventRepository } from "domain/src/model/event/repository";

@injectable()
export class RespondAttendanceInteractor implements RespondAttendanceUsecase {
  constructor(
    @inject("RespondAttendancePresenter")
    private readonly presenter: RespondAttendancePresenter,
    @inject("EventRepository")
    private readonly eventRepository: EventRepository,
    @inject("GuestRepository")
    private readonly guestRepository: GuestRepository,
  ) {}

  handle = async (input: RespondAttendanceInput) => {
    const eventPath = new EventPath(input.eventPath);
    const event = await this.eventRepository.loadEventByPath(eventPath);
    if (!event) {
      throw new Error("event not found");
    }
    if (event.isGuestLimit()) {
      throw new Error("guest limit over");
    }
    const newGuest = NewGuest.new({
      number: event.makeNewGuestNumber(),
      name: input.name,
      memo: input.memo,
      attendance: input.attendance,
    });
    const guest = await this.guestRepository.create(eventPath, newGuest);
    await this.presenter.render({ guest });
  };
}
