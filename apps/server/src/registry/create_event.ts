import { DependencyContainer } from "tsyringe";
///import { CreateEventInteractor } from "usecase/src/create_event/interactor";
import { PrismaEventRepository } from "infra/src/db/prisma/event";

const presenter = {
  render: async (output: any): Promise<void> => {
    console.log(output);
  },
};
export const registerEvent = (container: DependencyContainer) => {
  container.register("CreateEventPresenter", { useValue: presenter });
  container.register("EventRepository", { useClass: PrismaEventRepository });
};
