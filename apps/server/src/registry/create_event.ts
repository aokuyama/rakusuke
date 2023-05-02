import { DependencyContainer } from "tsyringe";
import { PrismaEventRepository } from "infra/src/db/prisma/event";
import { PrismaGuestRepository } from "infra/src/db/prisma/guest";

const presenter = {
  render: async (output: any): Promise<void> => {
    console.log(output);
  },
};
export const registerEvent = (container: DependencyContainer) => {
  container.register("CreateEventPresenter", { useValue: presenter });
  container.register("EventRepository", { useClass: PrismaEventRepository });
  container.register("GuestRepository", {
    useClass: PrismaGuestRepository,
  });
};
