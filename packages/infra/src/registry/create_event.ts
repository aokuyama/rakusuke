import { CreateEventInteractor } from "usecase/src/create_event/interactor";
import { PrismaEventRepository } from "../db/prisma/event";
const presenter = {
  render: async (output: any): Promise<void> => {
    console.log(output);
  },
};
const eventRepository = new PrismaEventRepository();
export const createEvent = new CreateEventInteractor(
  presenter,
  eventRepository
);
