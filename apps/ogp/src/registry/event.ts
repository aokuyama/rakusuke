import { DependencyContainer } from "tsyringe";
import { PostgresEventRepository } from "infra/src/db/postgres/event";

export const registerEvent = (container: DependencyContainer) => {
  container.register("EventRepository", { useClass: PostgresEventRepository });
};
