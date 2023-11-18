import {
  UserToken,
  NewUserToken,
  UserRepository,
  UserEntity,
} from "domain/src/model/user";
import { UUID, NewUUID } from "domain/src/model/uuid";
import { client } from "./client";

export class PrismaUserRepository implements UserRepository {
  createByUUIDAndToken = async (
    uuid: NewUUID,
    token: NewUserToken,
  ): Promise<UserEntity> => {
    const r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.user.create({
        data: {
          uuid: uuid.value,
          token_digest: token.hashed(),
        },
      });
      return saveEvent;
    });
    return UserEntity.new({
      id: r.id,
      uuid: uuid.toExisting(),
      token: token.toExisting(),
    });
  };

  getByUUIDAndToken = async (
    uuid: UUID,
    token: UserToken,
  ): Promise<UserEntity | null> => {
    const r = await client.user.findUnique({
      where: {
        uuid: uuid.value,
      },
    });
    if (!r) {
      return null;
    }
    if (r.token_digest !== token.hashed()) {
      return null;
    }
    return UserEntity.new({ id: r.id, uuid: uuid, token: token });
  };
}
